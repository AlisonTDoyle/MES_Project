// Imports
import { Request, Response } from "express";
import dotenv from "dotenv";
import sql, { IResult } from "mssql";
import { UpdatedOperatorInformation } from "../../interfaces/request-models/update-op-line-status-req";
import { dbClientSetup } from "../../misc/db-client-setup";
import { OperatorLineCheckInOut, ValidateOperatorLineCheckInOut } from "../../interfaces/object-models/dbo/operator-line-check-in-out";
import { ConvertTimestampToSqlAcceptableFormat } from "../../misc/convert-timestamp-to-sql-acceptable-format";

dotenv.config();

// Properties
const _statusTable: string = process.env.OPERATOR_LINE_STATUS_TABLE || "";
const _schema: string = process.env.MAIN_SCHEMA || "";

// Create
export const createNewOperatorLineStatusRecord = async (req: Request, res: Response) => {
    // parse operator information
    let operatorId = req.params.operatorId as string;
    let statusInformation: UpdatedOperatorInformation = req.body as UpdatedOperatorInformation;
    let timestamp = new Date();

    console.log("Incoming Operator Line Status Update:", statusInformation);

    try {
        let db: sql.ConnectionPool = await dbClientSetup();

        let body = req.body;
        let newCheckInOutStatus: OperatorLineCheckInOut = {
            operatorId: Number.parseInt(operatorId),
            lineId: body.lineId,
            checkedIn: body.newStatus,
            timestamp: new Date()
        }
        const { error } = ValidateOperatorLineCheckInOut(newCheckInOutStatus);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        let query: string = `
            INSERT INTO ${_schema}.${_statusTable}
            (operatorId, lineId, checkedIn, timestamp)
            VALUES
            (${newCheckInOutStatus.operatorId}, ${newCheckInOutStatus.lineId}, ${newCheckInOutStatus.checkedIn}, ${ConvertTimestampToSqlAcceptableFormat(newCheckInOutStatus.timestamp)})
        `;

        let result: IResult<any> = await db.request().query(query);

        return res.status(200).json({
            message: result
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
}

// Read
export const readOperatorLineStatus = async (req: Request, res: Response) => {
    // parse operator id
    let operatorId = req.params.operatorId as string;

    try {
        let db: sql.ConnectionPool = await dbClientSetup();

        let query: string = `
            SELECT TOP(1) *
            FROM ${_schema}.${_statusTable}
            WHERE operatorId = 1
            ORDER BY timestamp DESC;
        `;

        let result: IResult<any> = await db.request().query(query);

        return res.status(200).json(
            result.recordset[0]
        );
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
}

// Update

// Delete