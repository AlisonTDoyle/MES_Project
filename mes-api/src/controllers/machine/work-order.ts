// import
import { Request, Response } from "express";
import dotenv from "dotenv";
import sql, { IResult } from "mssql";
import { dbClientSetup } from "../../misc/db-client-setup";

dotenv.config();

const _workOrderTable: string = process.env.WORK_ORDER_TABLE || "";

// Read
export const getCurrentWorkOrderForMachine = async (req: Request, res: Response) => {
    try {
        let db: sql.ConnectionPool = await dbClientSetup();
        let machineId: number = Number.parseInt(req.params.machineId as string);

        let query: string = `EXEC [dbo].[GetCurrentWorkOrderForMachine] @MachineId`;

        let result: IResult<any> = await db.request()
            .input('MachineId', sql.Int, machineId)
            .query(query);
        
        return res.status(200).json(result.recordset[0]);
    } catch (error: any) {
        console.error("API error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}