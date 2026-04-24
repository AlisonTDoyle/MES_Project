import AutoRefresh from "@/app/(routes)/(misc-components)/refresh-component/refresh";
import { WorkOrder } from "@/app/_interfaces/work-order";
import React from "react";
export const dynamic = 'force-dynamic'
import dotenv from "dotenv";

dotenv.config()
let apiUrl = process.env.API_URL;

let workOrder: WorkOrder | null;
try {
    let response = await fetch(`${apiUrl}/machine/5621/current-work-order`);
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
        <>
            <AutoRefresh></AutoRefresh>
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
            </div>
        </div>
        </>
    )
}