"use client"

import { MachineEventAlert } from "@/app/_interfaces/machine-event-alert";
import { ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/solid"

export function AlertTableItem({alert}:{alert: MachineEventAlert}) {
    return (
        <li className="list-row">
            <div>
                {alert.type === "Breakdown" ? (
                    <span className="badge badge-soft badge-error h-full" title="Breakdown"><ExclamationCircleIcon className="h-8 w-8" /></span>
                ) : alert.type === "Maintenance" ? (
                    <span className="badge badge-soft badge-warning h-full" title="Maintenance"><ExclamationCircleIcon className="h-8 w-8" /></span>
                ) : (
                    <span className="badge badge-soft badge-info h-full" title="Fault Notice"><InformationCircleIcon className="h-8 w-8" /></span>
                )}
            </div>
            <div>
                <b>Machine {alert.machineId} has broken down</b>
                <p>{alert.issue || "Unknown"} Issue</p>
                <p className="opacity-70">{new Date(alert.timestamp).toISOString()}</p>
            </div>
        </li>
    )
}