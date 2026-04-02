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
    let machineId: number = Number.parseInt(req.params.machineId as string);

    try {
        let db: sql.ConnectionPool = await dbClientSetup();

        let query:string = `EXEC [dbo].[GetLatestEventsForMachine] @MachineId, @NumberOfEvents`;

        let result = await db.request()
            .input('MachineId', sql.Int, machineId)
            .input('NumberOfEvents', sql.Int, 15)
            .query(query);
        
        return res.status(200).json(result.recordset);
    } catch (error: any) {
        console.error("API error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Update

// Delete