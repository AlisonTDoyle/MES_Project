// Imports
import { Request, Response } from "express";
import dotenv from "dotenv";
import sql, { IResult } from "mssql";
import { dbClientSetup } from "../../misc/db-client-setup";

dotenv.config()

// Properties
const _operatorTable: string = process.env.OPERATOR_TABLE || "";
const _schema: string = process.env.MAIN_SCHEMA || "";

// Create

// Read
export const readOperatorWithCognitoId = async (req: Request, res: Response) => {
    let cognitoUsername: string = req.params?.cognitoUsername as string;

    if (!cognitoUsername) {
        return res.status(400).json({ message: "No identity provided" })
    }

    try {
        let db: sql.ConnectionPool = await dbClientSetup();

        let query: string = `EXEC GetOperatorByCognitoUsername @cognitoUsername`;

        let result: IResult<any> = await db.request()
            .input("cognitoUsername", sql.NVarChar, cognitoUsername)
            .query(query);

        return res.status(200).json({
            data: result.recordset[0]
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
}

export const readOperatorMachine = async (req: Request, res: Response) => {
    let operatorId: number = Number(req.params.operatorId) || -1;

    if (operatorId == -1) {
        return res.status(400).json({ error: "Invalid Operator ID passed" })
    } else {
        try {
            let db: sql.ConnectionPool = await dbClientSetup();

            let query: string = 'EXEC GetMachineOperatorIsAssignedTo @OperatorId';

            let result: IResult<any> = await db.request()
                .input("OperatorId", sql.Int, operatorId)
                .query(query);

            return res.status(200).json({ "data": result.recordset[0] })
        } catch (error) {
            return res.status(400).json({ "error": error });
        }
    }
}

// Update

// Delete