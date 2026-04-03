// Imports
import { Request, Response } from "express";
import dotenv from "dotenv";
import sql, { IResult } from "mssql";
import { dbClientSetup } from "../../misc/db-client-setup";

dotenv.config();

// Properties
const _workOrderTable: string = process.env.WORK_ORDER_TABLE || "";

// Create

// Read
export const readWorkOrders = async (req: Request, res: Response) => {
    // let today = new Date();

    // let { data, error } = await _supabase
    //     .from(_workOrderTable)
    //     .select("*")
    //     .eq("scheduleDate", today.toISOString().split('T')[0])
    //     .order("scheduleDate", { ascending: true });

    // if (error) {
    //     res.status(400).json({ message: error.message });
    // }

    // res.status(200).json({ data });
}

export const readWorkOrdersForTimePeriod = async (req: Request, res: Response) => {
    // let body = req.body as {timePeriod:number};
    // let timePeriod = body.timePeriod;

    // let today = new Date();
    // let endDay = addDays(today, timePeriod);

    // let { data, error } = await _supabase
    //     .from(_workOrderTable)
    //     .select("*")
    //     .lte("scheduleDate", endDay.toISOString().split('T')[0])
    //     .gte("scheduleDate", today.toISOString().split('T')[0])
    //     .order("scheduleDate", { ascending: true });

    // if (error) {
    //     res.status(400).json({ message: error.message });
    // }

    // res.status(200).json({ data });
}

export const readStatusesOfAllOngoingWorkOrders = async (req: Request, res: Response) => {
    try {
        let db: sql.ConnectionPool = await dbClientSetup();

        let query = `EXEC GetStatusesOfAllOngoingWorkOrders`;
        
        let result: IResult<any> = await db.request().query(query);

        return res.status(200).json({
            message: result.recordset
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while fetching work order statuses."
        });
    }
}

// Update

// Delete

// Misc
