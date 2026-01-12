'use server';

import { BreakdownType } from "@/app/_interfaces/breakdown-type";
import Form from "next/form";
import BreakdownForm from "./breakdown-form";

export default async function RecordBreakdown() {
    let _apiUrl: string | undefined = process.env.API_URL;
    const _response = await fetch(`${_apiUrl}/breakdown/type`);
    const _parsedRes: { data: [] } = await _response.json();
    const _breakdownTypes:BreakdownType[] = _parsedRes.data;

    return (
        <div>
            <h1>Record Breakdown</h1>
            <BreakdownForm breakdownTypes={_breakdownTypes}></BreakdownForm>
        </div>
    )
}