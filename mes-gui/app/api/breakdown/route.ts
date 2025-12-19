import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'

// properties
const _machineBreakdownTable: string = "Machine Breakdowns"
const _supabaseUrl: string = process.env.SUPABASE_URL || "";
const _supabaseKey: string = process.env.SUPABASE_KEY || "";
const _supabase = createClient(_supabaseUrl, _supabaseKey)

// routes
export async function POST(request: NextRequest) {
    let body = await request.json() || ""
    let machineId = body.machineId;
    let reportingOperatorId = body.reportingOperatorId;
    let description = body.description || "";
    let breakdownType = body.type;
    let timestamp = new Date();

    let { data, error } = await _supabase
        .from(_machineBreakdownTable)
        .insert([{
            machineId: machineId,
            reportingOperatorId: reportingOperatorId,
            description: description,
            timestamp: timestamp,
            resolved: false,
            type: breakdownType
        }])
        .select();

    if (error) {
        return Response.json({ error: error });
    }

    return Response.json({ result: data });
}