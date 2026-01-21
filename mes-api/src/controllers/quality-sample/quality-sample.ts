// Imports
import { Request, Response } from "express";
import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv";

dotenv.config();

// Properties
const _supabaseUrl: string = process.env.SUPABASE_URL || "";
const _supabaseKey: string = process.env.SUPABASE_KEY || "";
const _supabase = createClient(_supabaseUrl, _supabaseKey)
const _qualitySampleTable: string = process.env.QUALITY_CONTROL_TABLE || "";

// Create

export const createNewQualitySampleRecord = async (req: Request, res: Response) => {
    // parse req info
    let reqBody = req.body;
}

// Read

// Update

// Delete