// Imports
import { Request, Response } from "express";
import dotenv from "dotenv";
import sql from "mssql";
import { dbClientSetup } from "../../misc/db-client-setup";

dotenv.config();

const _machineEventsTable: string = process.env.MACHINE_EVENTS_TABLE || ""

// Create

// Read
export const readMachineEventHistory = async (req: Request, res: Response) => {
    try {
        let db: sql.ConnectionPool = await dbClientSetup();

        // get filter information
        let machineId: number = Number.parseInt(Array.isArray(req.params.machineId) ? req.params.machineId[0] : req.params.machineId);
        let timePeriod: string = req.query.timePeriod == undefined ? "1" : (req.query.timePeriod).toString();
        let timePeriodInMonths: number = Number.parseInt(timePeriod);

        // calc cut off date
        let today = new Date();
        let cutoffDate = new Date;

        cutoffDate.setMonth(today.getMonth() - timePeriodInMonths)

        // fetch information related to machine

        
    } catch (error: any) {

    }
}

// Update

// Delete