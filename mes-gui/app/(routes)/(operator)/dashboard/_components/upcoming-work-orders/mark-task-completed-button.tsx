"use client";

import { WorkOrder } from "@/app/_interfaces/work-order";
import { useState } from "react";

export function MarkTaskCompletedButton({ workOrder }: { workOrder: WorkOrder }) {
    let isCompleted: boolean = workOrder.completed;
    let [nextState, setNextState] = useState(isCompleted ? "Incomplete" : "Complete");
    let [buttonStyling, setButtonStyling] = useState(isCompleted ? 'btn-danger' : 'btn-success');

    const sendPostRequest = async () => {
        const response = await fetch(
            `http://localhost:3001/api/operator/${workOrder.operatorId}/work-order`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    workOrderId: workOrder.id,
                    status: !isCompleted
                }),
            }
        );

        // update variables and components
        isCompleted = !isCompleted;
        setButtonStyling(isCompleted ? 'btn-danger' : 'btn-success');
        setNextState(isCompleted ? "Incomplete" : "Complete");
    };

    return (
        <div>
            <button className={`${buttonStyling}`} onClick={sendPostRequest}>Mark as {nextState}</button>
        </div>
    );
}