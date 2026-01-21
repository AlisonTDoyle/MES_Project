// Imports
import { Request, Response } from "express";
import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv";
import { QualitySample } from "../../interfaces/object-models/quality-sample";

dotenv.config();

// Properties
const _supabaseUrl: string = process.env.SUPABASE_URL || "";
const _supabaseKey: string = process.env.SUPABASE_KEY || "";
const _supabase = createClient(_supabaseUrl, _supabaseKey)
const _qualitySampleTable: string = process.env.QUALITY_CONTROL_TABLE || "";

// Create
export const createNewQualitySampleRecord = async (req: Request, res: Response) => {

    try {
        const sample: QualitySample = req.body;

        const { data, error } = await _supabase
            .from(_qualitySampleTable)
            .insert([
                {
                    workOrderId: sample.workOrderId,
                    itemId: sample.itemId,
                    sampleTime: sample.sampleTime,
                    result: sample.result,
                    sampleQuantity: sample.sampleQuantity,
                    sampleUnit: sample.sampleUnit,
                    operatorId: sample.operatorId,
                    notes: sample.notes,
                },
            ])
            .select()
            .single();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(201).json(data);
    } catch (err) {
        return res.status(500).json({ error: "Failed to create quality sample" });
    }
};


// Read
export const getQualitySamplesByWorkOrder = async (req: Request, res: Response) => {
    try {
        const workOrderId = req.query["work-order"] as string;

        if (!workOrderId) {
            return res.status(400).json({
                error: 'Missing required query parameter "work-order"',
            });
        }

        const { data, error } = await _supabase
            .from(_qualitySampleTable)
            .select("*")
            .eq("workOrderId", workOrderId)
            .order("sampleTime", { ascending: false });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({
            error: "Failed to fetch quality samples by work order",
        });
    }
};

export const getQualitySampleById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const { data, error } = await _supabase
            .from(_qualitySampleTable)
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            return res.status(404).json({ error: "Quality sample not found" });
        }

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch quality sample" });
    }
};


// Update

// Delete