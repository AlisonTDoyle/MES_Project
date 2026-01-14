// Imports
import { Request, Response } from "express";
import Joi from "joi";
import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv";

dotenv.config();

// Properties
const _supabaseUrl: string = process.env.SUPABASE_URL || "";
const _supabaseKey: string = process.env.SUPABASE_KEY || "";
const _supabase = createClient(_supabaseUrl, _supabaseKey)
const _breakdownTypesTable: string = process.env.BREAKDOWN_TYPES_TABLE || ""

// Create

// Read
export const readBreakdownTypes = async (req: Request, res: Response) => {
    try {
        let { data, error } = await _supabase
            .from(_breakdownTypesTable)
            .select("*");

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