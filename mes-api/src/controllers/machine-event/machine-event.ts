// Imports
import { Request, Response } from "express";
import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv";
import { MachineEvent } from "../../interfaces/object-models/machine-event";

dotenv.config();

// Properties
const _supabaseUrl: string = process.env.SUPABASE_URL || "";
const _supabaseKey: string = process.env.SUPABASE_KEY || "";
const _supabase = createClient(_supabaseUrl, _supabaseKey)
const _machineEventsTable: string = process.env.MACHINE_EVENTS_TABLE || ""

// Create
export const createNewMachineEventRecord = async (req: Request, res: Response) => {
    try {
        // parse req. body as new machine event record
        let me: MachineEvent = req.body as MachineEvent;
        let timestamp = new Date();

        // add to database
        let { data, error } = await _supabase
            .from(_machineEventsTable)
            .insert([{
                machineId: me.machineId,
                reportingOperatorId: me.reportingOperatorId,
                description: me.description,
                timestamp: timestamp,
                resolved: false,
                type: me.relatedIssue
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