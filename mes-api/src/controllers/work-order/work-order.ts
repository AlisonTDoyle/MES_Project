// Imports
import { Request, Response } from "express";
import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv";
import { addDays } from "../../misc/add-date";

dotenv.config();

// Properties
const _supabaseUrl: string = process.env.SUPABASE_URL || "";
const _supabaseKey: string = process.env.SUPABASE_KEY || "";
const _supabase = createClient(_supabaseUrl, _supabaseKey);
const _workOrderTable: string = process.env.WORK_ORDER_TABLE || "";

// Create

// Read
export const readWorkOrders = async (req: Request, res: Response) => {
    let today = new Date();

    let { data, error } = await _supabase
        .from(_workOrderTable)
        .select("*")
        .eq("scheduleDate", today.toISOString().split('T')[0])
        .order("scheduleDate", { ascending: true });

    if (error) {
        res.status(400).json({ message: error.message });
    }

    res.status(200).json({ data });
}

export const readWorkOrdersForTimePeriod = async (req: Request, res: Response) => {
    let body = req.body as {timePeriod:number};
    let timePeriod = body.timePeriod;

    let today = new Date();
    let endDay = addDays(today, timePeriod);

    let { data, error } = await _supabase
        .from(_workOrderTable)
        .select("*")
        .lte("scheduleDate", endDay.toISOString().split('T')[0])
        .gte("scheduleDate", today.toISOString().split('T')[0])
        .order("scheduleDate", { ascending: true });

    if (error) {
        res.status(400).json({ message: error.message });
    }

    res.status(200).json({ data });
}

// Update

// Delete

// Misc
