// Imports
import { Request, Response } from "express";
import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv";
import { OperatorRecordedEvent } from "../../interfaces/object-models/dbo/operator-recorded-event";

dotenv.config();

// Properties
const _supabaseUrl: string = process.env.SUPABASE_URL || "";
const _supabaseKey: string = process.env.SUPABASE_KEY || "";
const _supabase = createClient(_supabaseUrl, _supabaseKey)
const _machineEventsTable: string = process.env.MACHINE_EVENTS_TABLE || ""

// Create
export const createNewMachineEventRecord = async (
  req: Request,
  res: Response
) => {
  try {
    const me: OperatorRecordedEvent = req.body;

    console.log("Incoming Machine Event:", me);

    const { data, error } = await _supabase
      .from(_machineEventsTable)
      .insert([
        {
          machineId: me.machineId,
          reportingOperatorId: me.reportingOperatorId,
          description: me.description,
          timestamp: new Date(me.timestamp),
          resolved: false,
          relatedIssue: me.relatedIssue ?? 0,
          eventType: me.eventType, 
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json(data);
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Read

// Update

// Delete