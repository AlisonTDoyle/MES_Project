import { WorkOrder } from "@/app/_interfaces/work-order";
import { PlayIcon, PauseIcon, CheckIcon } from "@heroicons/react/24/solid"
import React from "react";
export const dynamic = 'force-dynamic'

let workOrder: WorkOrder | null;
try {
    let response = await fetch("http://localhost:3001/api/machine/5621/current-work-order");
    workOrder = await response.json() || {};
} catch (e) {
    workOrder = null;
    console.log("Error: Could not fetch current order information")
}

export function CurrentWorkOrder() {
    function formatDescription() {
        if (!workOrder?.description) return "No description provided.";

        let desc = workOrder.description;

        return desc.split('\\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                {index < desc.split('\\n').length - 1 && <br />}
            </React.Fragment>
        ));
    }

    return (
    <div className="card shadow-sm h-full">
        <div className="card-body flex flex-col flex-1 min-h-0">
            <span className="card-title shrink-0 pb-2">Current Work Order</span>
            <table className="table">
                <tbody>
                    <tr>
                        <td className="font-bold">ID</td>
                        <td>{workOrder?.productionOrderId}-{workOrder?.id}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Creation Date</td>
                        <td>{workOrder != null ? new Date(workOrder.creationDate).toLocaleDateString() : ""}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Description</td>
                        <td>{formatDescription()}</td>
                    </tr>
                </tbody>
            </table>
            {/* <div className="mt-auto flex flex-col gap-2">
                <button className="btn btn-success"><PlayIcon className="w-4" /><span>Start WO</span></button>
                <button className="btn btn-warning"><PauseIcon className="w-4" />Pause WO</button>
                <button className="btn btn-primary"><CheckIcon className="w-4" /><span>Mark WO Complete</span></button>
            </div> */}
        </div>
    </div>
    )
}