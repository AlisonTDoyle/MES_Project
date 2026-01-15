// Imports
import { Request, Response } from "express";
import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv";

dotenv.config();

// Properties
const _supabaseUrl: string = process.env.SUPABASE_URL || "";
const _supabaseKey: string = process.env.SUPABASE_KEY || "";
const _supabase = createClient(_supabaseUrl, _supabaseKey);
const _productionOrderTable: string = process.env.PRODUCTION_ORDER_TABLE || "";

// Create

// Read
export const readProductionOrder = async (req: Request, res: Response) => {
    let productionOrderId: number = Number(req.params.productionOrderId) || -1;

    if (productionOrderId == -1) {
        return res.status(500).json({ error: "Invalid ID passed" })
    } else {
        let { data, error } = await _supabase
            .from(_productionOrderTable)
            .select(`*, Customer(name)`)
            .eq('id', productionOrderId)
            .single();

        if (error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(200).json({ data });
        }
    }
}

export const readProductionOrders = async (req: Request, res: Response) => {
    let { data, error } = await _supabase
        .from(_productionOrderTable)
        .select(`*, Customer(name)`)
        .limit(15)
        .order('orderPlaced', {ascending: false})
        .order('deadline', {ascending: false});

    if (error) {
        return res.status(400).json({ error: error.message });
    } else {
        return res.status(200).json({ data });
    }
}

// Update
export const updateProductionOrderDetails = async (req:Request, res:Response) => {
    
}

// Delete