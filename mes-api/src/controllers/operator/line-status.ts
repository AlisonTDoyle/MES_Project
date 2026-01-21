// Imports
import { Request, Response } from "express";
import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv";
import { UpdatedOperatorInformation } from "../../interfaces/request-models/update-op-line-status-req";

dotenv.config();

// Properties
const _supabaseUrl: string = process.env.SUPABASE_URL || "";
const _supabaseKey: string = process.env.SUPABASE_KEY || "";
const _supabase = createClient(_supabaseUrl, _supabaseKey)
const _statusTable: string = process.env.OPERATOR_LINE_STATUS_TABLE || ""

// Create
export const createNewOperatorLineStatusRecord = async (req: Request, res: Response) => {
    // parse operator information
    let operatorId = req.params.operatorId as string;
    let statusInformation: UpdatedOperatorInformation = req.body as UpdatedOperatorInformation;
    let timestamp = new Date();

    console.log("Incoming Operator Line Status Update:", statusInformation);

    try {
        // create new operator line status record
        let { data, error } = await _supabase
            .from(_statusTable)
            .insert([{
                operatorId: operatorId,
                lineId: statusInformation.lineId,
                eventType: statusInformation.newStatus,
                timestamp: timestamp
            }])
            .select();

        res.status(200).json({ data });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
}

// Read
export const readOperatorLineStatus = async (req: Request, res: Response) => {
    // parse operator id
    let operatorId = req.params.operatorId as string;

    try {
        // get opertator status
        let { data, error } = await _supabase
            .from(_statusTable)
            .select("*")
            .eq("operatorId", operatorId)
            .order("timestamp", { ascending: false })
            .limit(1)
            .maybeSingle();

        res.status(200).json({ data });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
}

// Update

// Delete