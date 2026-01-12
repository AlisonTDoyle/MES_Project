// Imports
import { Request, Response } from "express";
import Joi from "joi";
import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv";
import { WorkOrderCompleteReqBody } from "../../interfaces/request-models/work-order-complete-req";

dotenv.config();

// Properties
const _supabaseUrl: string = process.env.SUPABASE_URL || "";
const _supabaseKey: string = process.env.SUPABASE_KEY || "";
const _supabase = createClient(_supabaseUrl, _supabaseKey)
const _workOrderTable: string = process.env.WORK_ORDER_TABLE || ""

// Create

// Read
export const readTodaysWorkOrders  = async (req: Request, res: Response) => {
    // parse information
    let operatorId = req.params.operatorId as string;
    let today = new Date();

    // read in all work orders for today for this operator
    let {data, error} = await _supabase
        .from(_workOrderTable)
        .select("*")
        .eq("scheduleDate", today.toISOString().split('T')[0])
        .eq("operatorId", operatorId)
        .order("scheduleDate", { ascending: true });
    
    // return results
    if (error) {
        res.status(400).json({ message: error.message });
    }

    res.status(200).json({ data });
}

// Update
export const updateWorkOrderStatus = async (req: Request, res: Response) => {
    // parse information
    console.log(req.body)
    let workOrderReq = req.body as WorkOrderCompleteReqBody;

    console.log(workOrderReq)

    // update work order as completed
    let {data, error} = await _supabase
        .from('Work Order')
        .update({ completed: workOrderReq.status })
        .eq('id', workOrderReq.workOrderId)
        .select()

    console.log(data);

    // return results
    if (error) {
        res.status(400).json({ message: error.message });
    }

    res.status(200).json({ data });
}

// Delete