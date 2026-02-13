// Imports
import { Request, Response } from "express";
import dotenv from "dotenv";
import sql, { IResult } from "mssql";
import { dbClientSetup } from "../../misc/db-client-setup";
import { WorkOrderCompleteReqBody } from "../../interfaces/request-models/work-order-complete-req";

dotenv.config();

// Properties
const _workOrderTable: string = process.env.WORK_ORDER_TABLE || "";
const _schema: string = process.env.MAIN_SCHEMA || "";

// Create
// Create
export const createWorkOrder = async (req: Request, res: Response) => {
    try {
        let body = req.body; // or strongly type if you have interface

        let db: sql.ConnectionPool = await dbClientSetup();

        let query: string = `
            INSERT INTO ${_schema}.${_workOrderTable}
            (
                operatorId,
                lineId,
                description,
                scheduleDate,
                completed,
                productionOrderItemId
            )
            OUTPUT INSERTED.*
            VALUES
            (
                @operatorId,
                @lineId,
                @description,
                @scheduleDate,
                @completed,
                @productionOrderItemId
            );
        `;

        let result: IResult<any> = await db.request()
            .input("operatorId", sql.Int, body.operatorId)
            .input("lineId", sql.Int, body.lineId)
            .input("description", sql.NVarChar, body.description)
            .input("scheduleDate", sql.Date, body.scheduleDate)
            .input("completed", sql.Bit, body.completed ?? false)
            .input("productionOrderItemId", sql.Int, body.operatorId)
            .query(query);

        return res.status(201).json({
            data: result.recordset[0]
        });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        } else {
            return res.status(500).json({ message: "Unknown error occurred" });
        }
    }
};

// Read
export const readTodaysWorkOrders = async (req: Request, res: Response) => {
    let operatorId = req.params.operatorId as string;
    let today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    try {
        let db: sql.ConnectionPool = await dbClientSetup();

        let query: string = `
            SELECT *
            FROM ${_schema}.${_workOrderTable}
            WHERE scheduleDate = @today
            AND operatorId = @operatorId
            ORDER BY scheduleDate ASC;
        `;

        let result: IResult<any> = await db.request()
            .input("today", sql.Date, today)
            .input("operatorId", sql.Int, Number.parseInt(operatorId))
            .query(query);

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
export const updateWorkOrderStatus = async (req: Request, res: Response) => {
    console.log(req.body);
    let workOrderReq = req.body as WorkOrderCompleteReqBody;

    try {
        let db: sql.ConnectionPool = await dbClientSetup();

        let query: string = `
            UPDATE ${_schema}.${_workOrderTable}
            SET completed = @status
            WHERE id = @workOrderId;

            SELECT *
            FROM ${_schema}.${_workOrderTable}
            WHERE id = @workOrderId;
        `;

        let result: IResult<any> = await db.request()
            .input("status", sql.Bit, workOrderReq.status)
            .input("workOrderId", sql.Int, workOrderReq.workOrderId)
            .query(query);

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

// Delete
// (not implemented)
