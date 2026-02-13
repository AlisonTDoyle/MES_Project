// Imports
import { Request, Response } from "express";
import dotenv from "dotenv";
import sql, { IResult } from "mssql";
import { dbClientSetup } from "../../misc/db-client-setup";

dotenv.config();

// Properties
const _machineIssueType: string = process.env.MACHINE_ISSUE_TYPE || "";
const _schema: string = process.env.TYPES_SCHEMA || "";

// Create
// (not implemented)

// Read
export const readMachineIssueType = async (req: Request, res: Response) => {
    try {
        let db: sql.ConnectionPool = await dbClientSetup();

        let query: string = `
            SELECT *
            FROM ${_schema}.${_machineIssueType};
        `;

        let result: IResult<any> = await db.request().query(query);

        return res.status(200).json({
            data: result.recordset
        });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        } else {
            return res.status(500).json({ message: "Unknown error occurred" });
        }
    }
};

// Update
// (not implemented)

// Delete
// (not implemented)
