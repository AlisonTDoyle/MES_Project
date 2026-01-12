// Imports
import { Request, Response } from "express";
import Joi from "joi";
import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv";
import { MachineBreakdown } from "../../interfaces/object-models/machine-breakdown";

dotenv.config();

// Properties
const _supabaseUrl: string = process.env.SUPABASE_URL || "";
const _supabaseKey: string = process.env.SUPABASE_KEY || "";
const _supabase = createClient(_supabaseUrl, _supabaseKey)
const _machineBreakdownTable: string = process.env.MACHINE_BREAKDOWNS_TABLE || ""

// Create
export const createNewBreakdownRecord = async (req: Request, res: Response) => {
    try {
        // parse req. body as new breakdown record
        let mb: MachineBreakdown = req.body as MachineBreakdown;
        let timestamp = new Date();

        // add to database
        let { data, error } = await _supabase
            .from(_machineBreakdownTable)
            .insert([{
                machineId: mb.machineId,
                reportingOperatorId: mb.reportingOperatorId,
                description: mb.description,
                timestamp: timestamp,
                resolved: false,
                type: mb.type
            }])
            .select();

        res.status(201).json({ data });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
}

// Read

// Update

// Delete