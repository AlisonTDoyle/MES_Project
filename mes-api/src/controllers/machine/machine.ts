// Imports
import { Request, Response } from "express";
import dotenv from "dotenv";
import sql, { IResult } from "mssql";
import { dbClientSetup } from "../../misc/db-client-setup";
import { ValidateMachine } from "../../interfaces/object-models/dbo/machine";
import { MachineType } from "../../enums/machineType";

dotenv.config();

const _machineTable: string = process.env.MACHINE_TABLE || "";

const _updatableFields = [
    'lineId',
    'machineType',
    'description'
] as const;

// Create
export const createNewMachine = async (req: Request, res: Response) => {
    try {
        let db: sql.ConnectionPool = await dbClientSetup();

        let machine = req.body;
        const { error } = ValidateMachine(machine);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        let query = `
            INSERT INTO ${_machineTable}
            (lineId, machineType, description)
            VALUES
            (${machine.lineId}, ${machine.machineType}, '${machine.description}')
        `;

        let result: IResult<any> = await db.request().query(query);

        return res.status(200).json({
            message: result
        });
    } catch (error: any) {
        if (error.code == "ETIMEOUT") {
            return res.status(408).json({ error: "Request Timeout" });
        }

        return res.status(500).json({ error: error.message, code: error.code });
    }
}

// Read
export const getMachineById = async (req: Request, res: Response) => {
    try {
        let db: sql.ConnectionPool = await dbClientSetup();

        let machineId: string = req.params.id as string;

        if (machineId && Number.parseInt(machineId)) {
            let query = `
            SELECT *
            FROM ${_machineTable}
            WHERE id = ${machineId}
        `;

            let result: IResult<any> = await db.request().query(query);

            return res.status(200).json({ data: result.recordset })
        } else {
            return res.status(400).json({ error: "Bad Request" })
        }
    } catch (error: any) {
        if (error.code == "ETIMEOUT") {
            return res.status(408).json({ error: "Request Timeout" });
        }

        return res.status(500).json({ error: error.message, code: error.code });
    }
}

export const searchForMachinesById = async (req:Request, res: Response) => {
    try {
        let db: sql.ConnectionPool = await dbClientSetup();

        let idSearchTerm: string = req.query.search as string;

        if (!Number.isInteger(idSearchTerm)) {
            return res.status(400).json({ error: "Bad Request" });
        }

        let query = `
            SELECT TOP(20) [id]
            FROM ${_machineTable}
            WHERE id LIKE '%${idSearchTerm}%'
        `;

        let result = await db.request().query(query);

        return res.status(200).json({ data: result.recordset })
    } catch (error:any) {
        if (error.code == "ETIMEOUT") {
            return res.status(408).json({ error: "Request Timeout" });
        }

        return res.status(500).json({ error: error.message, code: error.code });
    }
}

// Update
export const updateMachine = async (req: Request, res: Response) => {
    try {
        const db = await dbClientSetup();

        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            return res.status(400).json({ error: 'Invalid id' });
        }

        const updates: string[] = [];
        const request = db.request();

        for (const field of _updatableFields) {
            if (req.body[field] !== undefined) {
                updates.push(`${field} = @${field}`);
                request.input(field, req.body[field]);
            }
        }

        if (updates.length === 0) {
            return res.status(400).json({ error: 'No valid fields provided' });
        }

        request.input('id', sql.Int, id);

        const query = `
            UPDATE ${_machineTable}
            SET ${updates.join(', ')}
            WHERE id = @id
        `;

        await request.query(query);

        return res.status(200).json({ message: `Machine with ID '${id}' has been updated` })

    } catch (error: any) {
        if (error.code == "ETIMEOUT") {
            return res.status(408).json({ error: "Request Timeout" });
        }

        return res.status(500).json({ error: error.message, code: error.code });
    }
};

// Delete
export const deleteMachine = async (req: Request, res: Response) => {
    try {
        const db = await dbClientSetup();

        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            return res.status(400).json({ error: 'Invalid id' });
        }

        let query: string = `
            DELETE FROM ${_machineTable}
            WHERE id = ${id}
        `;

        let result = await db.request().query(query);

        return res.status(200).json({ message: `Machine with ID '${id}' has been deleted` })
    } catch (error: any) {
        if (error.code == "ETIMEOUT") {
            return res.status(408).json({ error: "Request Timeout" });
        }

        return res.status(500).json({ error: error.message, code: error.code });
    }
};