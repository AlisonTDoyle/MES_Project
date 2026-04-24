"use client"

import AutoRefresh from "@/app/(routes)/(misc-components)/refresh-component/refresh";
import { Operator } from "@/app/_interfaces/operator";
import { WorkOrder } from "@/app/_interfaces/work-order";
import { fetchAuthSession } from "aws-amplify/auth";
export const dynamic = 'force-dynamic'
import { useEffect, useState } from "react";
import { GetOperator, GetWorkOrder } from "./current-work-order-actions";
import React from "react";

export function CurrentWorkOrder() {
    let [workOrder, setWorkOrder] = useState<WorkOrder>();
        
    useEffect(() => {
        async function getWorkOrder() {
            // get user cognito id
            const session = await fetchAuthSession();
            let cognitoUsername = session.userSub as string;
            let op:Operator = await GetOperator(cognitoUsername);

            let wo = await GetWorkOrder(op.id);

            setWorkOrder(wo)
        }

        getWorkOrder();
    }, []);

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