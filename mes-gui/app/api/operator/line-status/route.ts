
import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'

// properites
const _statusTable: string = "OperatorLineCheckInOut"
const _supabaseUrl: string = process.env.SUPABASE_URL || "";
const _supabaseKey: string = process.env.SUPABASE_KEY || "";
const _supabase = createClient(_supabaseUrl, _supabaseKey)

export async function GET(request: Request) {
  return Response.json(
    {"message":"hello world"},
    {status:200}
  )
}

export async function POST(request: NextRequest) {
  let body = await request.json() || ""
  const operatorId = body.operatorId;
  const lineId = body.lineId;
  const newStatus = body.newStatus;
  const time = new Date();

  const { data, error } = await _supabase
    .from(_statusTable)
    .insert([{ operatorId, lineId, eventType: newStatus, timestamp: time }])
    .select();

  return Response.json({ result: error });
}

