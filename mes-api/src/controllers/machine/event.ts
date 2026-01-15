// Imports
import { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const _supabaseUrl: string = process.env.SUPABASE_URL || "";
const _supabaseKey: string = process.env.SUPABASE_KEY || "";
const _supabase = createClient(_supabaseUrl, _supabaseKey)
const _machineEventsTable: string = process.env.MACHINE_EVENTS_TABLE || ""

// Create

// Read
export const readMachineEventHistory = async (req: Request, res: Response) => {
    // get filter information
    let machineId: number = Number.parseInt(Array.isArray(req.params.machineId) ? req.params.machineId[0] : req.params.machineId);
    let timePeriod: string = req.query.timePeriod == undefined ? "1" : (req.query.timePeriod).toString();
    let timePeriodInMonths: number = Number.parseInt(timePeriod);

    // calc cut off date
    let today = new Date();
    let cutoffDate = new Date;

    cutoffDate.setMonth(today.getMonth() - timePeriodInMonths)

    // fetch information related to machine
    let { data, error } = await _supabase
        .from(_machineEventsTable)
        .select("*")
        .lte('timestamp', cutoffDate)
        .eq('machineId', machineId)
        .order('timestamp', { ascending: false });

    if (error) {
        let err: Error = error as Error;
        res.status(500).json({ message: err.message });
    } else {
        res.status(200).json(data);
    }
}

// Update

// Delete