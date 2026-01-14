"use client"

import { BreakdownType } from "@/app/_interfaces/breakdown-type";
import { MachineEvent } from "@/app/_interfaces/machine-breakdown";

export function AlertTableItem({breakdown, types}:{breakdown:MachineEvent, types:BreakdownType[]}) {
    return (
        <div className="tile tile-layer-2 mb-2">
            <b>Machine {breakdown.machineId} has broken down</b>
            <p>Error Type: {types[breakdown?.relatedIssue !== undefined ? breakdown.relatedIssue : 0]?.description || "Unknown"}</p>
            <p className="opacity-70">Reported By: Op. {breakdown.reportingOperatorId} at {new Date(breakdown.timestamp).toISOString()}</p>
        </div>
    )
}