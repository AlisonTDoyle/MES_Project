import { Request, Response } from "express";
import dotenv from "dotenv";
import { dbClientSetup } from "../../misc/db-client-setup";
import sql, { IResult } from "mssql";
import { ProductionOrder, ValidateProductionOrder } from "../../interfaces/object-models/production-order/production-order";
import { ConvertTimestampToSqlAcceptableFormat } from "../../misc/convert-timestamp-to-sql-acceptable-format";

dotenv.config();

// Create

// Read
export const ReadWorkOrdersForProductionOrderBasedOnStage = async (req: Request, res: Response) => {
    let productionOrderId: number = Number(req.params.productionOrderId) || -1;
    let stageId:number = Number(req.params.stage) || -1

    if (productionOrderId == -1) {
        return res.status(400).json({ error: "Invalid PO ID passed" })
    } else if (stageId == -1) {
        return res.status(400).json({ error: "Invalid Stage ID passed" })
    } else {
        try {
            let db: sql.ConnectionPool = await dbClientSetup();

            let query:string = 'EXEC GetWorkOrdersForProductionOrderBasedOnStage @ProductionOrderId, @Stage';

            let result:IResult<any> = await db.request()
                .input("ProductionOrderId", sql.Int, productionOrderId)
                .input("Stage", sql.Int, stageId)
                .query(query);

            return res.status(200).json({ data: result.recordset })
        } catch (error) {
            return res.status(400).json({ "error": error });
        }
    }
}

// Update

// Delete