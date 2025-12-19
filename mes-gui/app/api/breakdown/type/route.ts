import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'

// properties
const _breakdownTypesTable: string = "Breakdown Types"
const _supabaseUrl: string = process.env.SUPABASE_URL || "";
const _supabaseKey: string = process.env.SUPABASE_KEY || "";
const _supabase = createClient(_supabaseUrl, _supabaseKey)

// routes
export async function GET(request: Request) {
  let { data, error } = await _supabase
  .from(_breakdownTypesTable)
  .select("*")

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(
    { result: data },
    { status: 200 }
  );
}