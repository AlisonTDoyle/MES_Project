import { Request, Response } from "express";
import dotenv from "dotenv";
import sql, { IResult } from "mssql";
import { dbClientSetup } from "../../misc/db-client-setup";

dotenv.config()

const _productTable:string = process.env.PRODUCT_TABLE || '';
const _productSchema:string = process.env.MAIN_SCHEMA || '';

export const fetchProducts = async(req:Request, res:Response) => {
    try {
        let db:sql.ConnectionPool = await dbClientSetup();

        let query = `
            SELECT *
            FROM ${_productSchema}.${_productTable}
        `;

        let result: IResult<any> = await db.request().query(query);

        return res.status(200).json({ data: result.recordset })
    } catch (error:any) {
        if (error.code == "ETIMEOUT") {
            return res.status(408).json({ error: "Request Timeout" });
        }

        return res.status(500).json({ error: error.message, code: error.code });
    }
}