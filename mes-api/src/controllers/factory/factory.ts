import { ScanCommand } from "@aws-sdk/client-dynamodb";
import dynamoClient from "./../../misc/dynamodb-client"
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { FactoryEvent } from "../../interfaces/object-models/dbo/factory-event";
import { dbClientSetup } from "../../misc/db-client-setup";
import sql, { IResult } from "mssql";

dotenv.config();

export const readTodaysFactoryOutput = async (req: Request, res: Response) => {
    try {
        const items = await getTodaysEventsFromDynamo();

        return res.status(200).json({ message: items });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
};

export const getOeeFigures = async (req: Request, res: Response) => {
    let availability = 0;
    let performance = 0;
    let quality = 0;
    let oee = 0;

    try {
        const items = await getTodaysFactoryEvents();

        // availability
        const machineAvailabilities = calculateMachineAvailabilities(items);
        availability = parseFloat(
            ((machineAvailabilities.reduce((sum, a) => sum + a, 0) / machineAvailabilities.length) * 10).toFixed(2)
        );

        // performance
        let averageRunTime: number = await getAverageCompletionTime(items);
        const targetItemsPerHour = 360;
        const idealCycleTimeSeconds = 3600 / targetItemsPerHour; 
        performance = parseFloat(Math.min((idealCycleTimeSeconds / averageRunTime) * 100, 100).toFixed(2));

        // quality
        let date = new Date(new Date().setHours(0, 0, 0, 0));
        let lastNight = date.toISOString()

        let db: sql.ConnectionPool = await dbClientSetup();
        let query: string = `
            SELECT
            (SELECT COUNT(*) 
            FROM dbo.qualitySample 
            WHERE timestamp >= '${lastNight}') AS QualitySampleCount,
            
            (SELECT COUNT(*) 
            FROM dbo.workOrder 
            WHERE completionDate >= '${lastNight}') AS WOCompleted;
        `
        let result: IResult<any> = await db.request()
            .query(query);
        let qualitySampleCount = result.recordset[0].QualitySampleCount;
        let woCompleted = result.recordset[0].WOCompleted;

        quality = parseFloat((100 - ((qualitySampleCount / woCompleted)) * 100).toFixed(2))

        // calc oee
        oee = parseFloat(((availability * performance * quality) / 10000).toFixed(2));

        return res.status(200).json({
            message: { availability, performance, quality, oee }
        });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

export const readTodaysMachineAvailability = async (req: Request, res: Response) => {
    try {
        const THRESHOLD_MS = 1 * 60 * 1000; // 1 minute
        const SHIFT_START_HOUR = 8;
        const SHIFT_END_HOUR = 17;

        const items = await getTodaysFactoryEvents();

        // Group events by machineId
        const eventsByMachine: Record<string, FactoryEvent[]> = {};
        for (const event of items) {
            if (!eventsByMachine[event.machineId]) {
                eventsByMachine[event.machineId] = [];
            }
            eventsByMachine[event.machineId].push(event);
        }

        // Calculate availability per machine
        const availability = Object.entries(eventsByMachine).map(([machineId, events]) => {
            const sorted = [...events].sort((a, b) =>
                new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            );

            // Use shift times rather than first/last event
            const firstEvent = new Date(sorted[0].timestamp);
            const shiftStart = new Date(firstEvent);
            shiftStart.setHours(SHIFT_START_HOUR, 0, 0, 0);

            const shiftEnd = new Date(firstEvent);
            shiftEnd.setHours(SHIFT_END_HOUR, 0, 0, 0);

            // Cap end time to now if shift hasn't finished
            const now = new Date();
            const effectiveEnd = now < shiftEnd ? now : shiftEnd;
            const plannedTime = effectiveEnd.getTime() - shiftStart.getTime();

            // Sum up gaps over threshold
            let downtime = 0;

            // Check gap from shift start to first event
            const gapFromShiftStart = new Date(sorted[0].timestamp).getTime() - shiftStart.getTime();
            if (gapFromShiftStart > THRESHOLD_MS) downtime += gapFromShiftStart;

            // Check gaps between events
            for (let i = 1; i < sorted.length; i++) {
                const gap = new Date(sorted[i].timestamp).getTime() - new Date(sorted[i - 1].timestamp).getTime();
                if (gap > THRESHOLD_MS) downtime += gap;
            }

            // Check gap from last event to now (machine may be currently down)
            const gapFromLastEvent = effectiveEnd.getTime() - new Date(sorted[sorted.length - 1].timestamp).getTime();
            if (gapFromLastEvent > THRESHOLD_MS) downtime += gapFromLastEvent;

            const availability = Math.min(((plannedTime - downtime) / plannedTime) * 100, 100);
            const lastEventTime = new Date(sorted[sorted.length - 1].timestamp).getTime();
            const isDown = (Date.now() - lastEventTime) > THRESHOLD_MS;

            return {
                machineId,
                availability: Math.round(availability * 10) / 10,
                plannedTime: msToHMS(plannedTime),
                downtime: msToHMS(downtime),
                isDown,
                eventCount: events.length,
            };
        });

        return res.status(200).json({ message: availability });
    } catch (error) {
        return res.status(400).json({ error });
    }
};

function msToHMS(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

async function getTodaysFactoryEvents(): Promise<FactoryEvent[]> {
    const today = new Date().toISOString().split("T")[0];

    const command = new ScanCommand({
        TableName: process.env.FACTORY_EVENTS_TABLE,
        FilterExpression: "begins_with(#ts, :datePrefix)",
        ExpressionAttributeNames: { "#ts": "timestamp" },
        ExpressionAttributeValues: marshall({ ":datePrefix": today }),
    });

    const result = await dynamoClient.send(command);
    return result.Items?.map((item) => unmarshall(item)) as FactoryEvent[];
}

export function calculateMachineAvailabilities(items: FactoryEvent[]): number[] {
    const THRESHOLD_MS = 10 * 60 * 1000;
    const SHIFT_START_HOUR = 8;
    const SHIFT_END_HOUR = 17;

    const eventsByMachine: Record<string, FactoryEvent[]> = {};
    for (const event of items) {
        if (!eventsByMachine[event.machineId]) eventsByMachine[event.machineId] = [];
        eventsByMachine[event.machineId].push(event);
    }

    return Object.values(eventsByMachine).map((events) => {
        const sorted = [...events].sort((a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );

        const firstEvent = new Date(sorted[0].timestamp);
        const shiftStart = new Date(firstEvent);
        shiftStart.setHours(SHIFT_START_HOUR, 0, 0, 0);

        const shiftEnd = new Date(firstEvent);
        shiftEnd.setHours(SHIFT_END_HOUR, 0, 0, 0);

        const now = new Date();
        const effectiveEnd = now < shiftEnd ? now : shiftEnd;
        const plannedTime = effectiveEnd.getTime() - shiftStart.getTime();

        let downtime = 0;

        const gapFromShiftStart = new Date(sorted[0].timestamp).getTime() - shiftStart.getTime();
        if (gapFromShiftStart > THRESHOLD_MS) downtime += gapFromShiftStart;

        for (let i = 1; i < sorted.length; i++) {
            const gap = new Date(sorted[i].timestamp).getTime() - new Date(sorted[i - 1].timestamp).getTime();
            if (gap > THRESHOLD_MS) downtime += gap;
        }

        const gapFromLastEvent = effectiveEnd.getTime() - new Date(sorted[sorted.length - 1].timestamp).getTime();
        if (gapFromLastEvent > THRESHOLD_MS) downtime += gapFromLastEvent;

        return Math.min(((plannedTime - downtime) / plannedTime) * 100, 100);
    });
}

async function getTodaysEventsFromDynamo() {
    const today = new Date();
    const datePrefix = today.toISOString().split("T")[0]; // "2026-04-17"

    const command = new ScanCommand({
        TableName: process.env.FACTORY_EVENTS_TABLE,
        FilterExpression: "begins_with(#ts, :datePrefix) AND #status = :status",
        ExpressionAttributeNames: {
            "#ts": "timestamp",
            "#status": "status", // reserved word in DynamoDB, needs alias
        },
        ExpressionAttributeValues: marshall({
            ":datePrefix": datePrefix,
            ":status": "Completed",
        }),
    });

    const result = await dynamoClient.send(command);
    const items = result.Items?.map((item) => unmarshall(item)) || [];

    return items;
}

type WorkOrderTimes = {
    start?: Date;
    end?: Date;
};

function getAverageCompletionTime(items: any[]) {
    const now = new Date();
    const sixtyMinsAgo = new Date(now.getTime() - 60 * 60 * 1000);

    // Only include items from the last 60 minutes
    const recentItems = items.filter(item => new Date(item.timestamp) >= sixtyMinsAgo);

    const map = new Map<number, WorkOrderTimes>();

    for (const item of recentItems) {
        if (!map.has(item.workOrder)) {
            map.set(item.workOrder, {});
        }

        const entry = map.get(item.workOrder)!;
        if (item.status === 'Started')   entry.start = new Date(item.timestamp);
        if (item.status === 'Completed') entry.end   = new Date(item.timestamp);
    }

    const durations: number[] = [];
    for (const [, entry] of map) {
        if (entry.start && entry.end) {
            durations.push(entry.end.getTime() - entry.start.getTime());
        }
    }

    if (durations.length === 0) return 0;

    const avgMs = durations.reduce((a, b) => a + b, 0) / durations.length;
    return avgMs / 1000;
}