"use client"

import { BreakdownType } from "@/app/_interfaces/breakdown-type";
import { MachineBreakdown } from "@/app/_interfaces/machine-breakdown";

export function AlertTableItem({breakdown, types}:{breakdown:MachineBreakdown, types:BreakdownType[]}) {
    console.log(types)
    
    return (
        <div className="border border-neutral-500 p-2 mb-2 rounded">
            <b>Machine {breakdown.mahcineId} has broken down</b>
            <p>Error Type: {breakdown.id !== undefined && types[breakdown.id]?.description}</p>
            <p className="opacity-70">Reported By: Op. {breakdown.reportingOperatorId} at {new Date(breakdown.timestamp).toISOString()}</p>
        </div>
    )
}