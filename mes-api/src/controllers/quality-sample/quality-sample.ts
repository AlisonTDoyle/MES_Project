// Imports
import { Request, Response } from "express";
import dotenv from "dotenv";
import { QualitySample, ValidateQualitySample } from "../../interfaces/object-models/quality-sample";
import sql, { IResult } from "mssql";
import { dbClientSetup } from "../../misc/db-client-setup";

dotenv.config();

// Properties
const _qualitySampleTable: string = process.env.QUALITY_CONTROL_TABLE || "";

// Create
export const createNewQualitySampleRecord = async (req: Request, res: Response) => {
    try {
        let db: sql.ConnectionPool = await dbClientSetup();

        // validate passed data before going further
        let sample: QualitySample = req.body;
        const { error } = ValidateQualitySample(sample);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        let timestamp: string = ConvertTimestampToSqlAcceptableFormat(new Date(sample.timestamp));

        let query = `
            INSERT INTO ${_qualitySampleTable}
            (productOrderId, workOrderId, machineId, operatorId, timestamp, sampleQuantity, sampleUnit, notes, result)
            VALUES
            (${sample.productOrderId}, ${sample.workOrderId}, ${sample.machineId}, ${sample.operatorId}, ${timestamp}, ${sample.sampleQuantity}, '${sample.sampleUnit}', '${sample.notes || ""}', ${sample.result});
        `;

        let result: IResult<any> = await db.request().query(query);

        return res.status(200).json({ message: 'Added Quality Sample' });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

// Read
export const getQualitySampleById = async (req: Request, res: Response) => {
    try {
        let db: sql.ConnectionPool = await dbClientSetup();

        let qualitySampleId: string = req.params.id as string;

        if (qualitySampleId && Number.parseInt(qualitySampleId)) {
            let query = `
                SELECT *
                FROM ${_qualitySampleTable}
                WHERE id = ${qualitySampleId}
            `;

            let result: IResult<any> = await db.request().query(query);

            return res.status(200).json({ data: result.recordset })
        } else {
            return res.status(400).json({ error: "Bad Request" })
        }
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const getQualitySamplesByProductionOrder = async (req: Request, res: Response) => {
    try {
        const db = await dbClientSetup();

        const productionOrderId = Number(req.query.productionOrderId);

        if (!Number.isInteger(productionOrderId)) {
            return res.status(400).json({ error: "Bad Request" });
        }

        const result = await db.request()
            .input('productionOrderId', sql.Int, productionOrderId)
            .query(`
                SELECT *
                FROM ${_qualitySampleTable}
                WHERE productionOrderId = @productionOrderId
            `);

        return res.status(200).json({ data: result.recordset });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

// Update
export const updateQualitySample = async (req: Request, res: Response) => {
    try {
        const db = await dbClientSetup();

        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            return res.status(400).json({ error: 'Invalid id' });
        }

        const updates: string[] = [];
        const request = db.request();

        for (const field of updatableFields) {
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
            UPDATE ${_qualitySampleTable}
            SET ${updates.join(', ')}
            WHERE id = @id
        `;

        await request.query(query);

        return res.status(200).json({message: `Quality Sample with ID '${id}' has been updated`})

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

// Delete
export const deleteQualitySample = async (req: Request, res: Response) => {
    try {
        const db = await dbClientSetup();

        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            return res.status(400).json({ error: 'Invalid id' });
        }

        let query:string = `
            DELETE FROM ${_qualitySampleTable}
            WHERE id = ${id}
        `;

        let result = await db.request().query(query);

        return res.status(200).json({message: `Quality Sample with ID '${id}' has been deleted`})
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
};

// Misc
function ConvertTimestampToSqlAcceptableFormat(sampleTimestamp: Date): string {
    let newTimestamp: string;

    var pad = function (num: any) { return ('00' + num).slice(-2) };
    let formattedTimestamp: string = sampleTimestamp.getUTCFullYear() + '-' +
        pad(sampleTimestamp.getUTCMonth() + 1) + '-' +
        pad(sampleTimestamp.getUTCDate()) + ' ' +
        pad(sampleTimestamp.getUTCHours()) + ':' +
        pad(sampleTimestamp.getUTCMinutes()) + ':' +
        pad(sampleTimestamp.getUTCSeconds());

    newTimestamp = `'${formattedTimestamp}'`;

    return newTimestamp
}

const updatableFields = [
    'productionOrderId',
    'workOrderId',
    'machineId',
    'operatorId',
    'notes',
    'result',
    'sampleQuantity',
    'sampleUnit',
    'timestamp'
] as const;

