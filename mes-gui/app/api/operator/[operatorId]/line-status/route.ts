import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'

// properties
const _statusTable: string = "OperatorLineCheckInOut"
const _supabaseUrl: string = process.env.SUPABASE_URL || "";
const _supabaseKey: string = process.env.SUPABASE_KEY || "";
const _supabase = createClient(_supabaseUrl, _supabaseKey)

// routes
export async function GET(request: Request, { params }: { params: Promise<{ operatorId: Number }> }) {
  let operatorId:Number = await Number((await params).operatorId);

  // get the latest entry for operator by sorting by timestamp desc and limiting to 1
  const { data, error } = await _supabase
    .from(_statusTable)
    .select("*")
    .eq("operatorId", operatorId)
    .order("timestamp", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(
    { result: data },
    { status: 200 }
  );
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ operatorId: Number }> }) {
  let body = await request.json() || ""
  let operatorId:Number = await Number((await params).operatorId);
  const lineId = body.lineId;
  const newStatus = body.newStatus;
  const time = new Date();

  const { data, error } = await _supabase
    .from(_statusTable)
    .insert([{ operatorId, lineId, eventType: newStatus, timestamp: time }])
    .select();

  if (error) {
    return Response.json({ error: error });
  }

  return Response.json({ result: data });
}

