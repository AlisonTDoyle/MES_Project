"use client";

import { WorkOrder } from "@/app/_interfaces/work-order";
import { useState } from "react";

export function MarkTaskCompletedButton({ workOrder }: { workOrder: WorkOrder }) {
    const [isCompleted, setIsCompleted] = useState(workOrder.completed);

    const nextState = isCompleted ? "Incomplete" : "Complete";
    const buttonStyling = isCompleted
        ? "btn btn-soft btn-error"
        : "btn btn-soft btn-success";

    const sendPostRequest = async () => {
        const newStatus = !isCompleted;

        await fetch(
            `http://localhost:3001/api/operator/${workOrder.operatorId}/work-order`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    workOrderId: workOrder.id,
                    status: newStatus,
                }),
            }
        );

        // update React state
        setIsCompleted(newStatus);
    };

    return (
        <button className={buttonStyling} onClick={sendPostRequest}>
            Mark as {nextState}
        </button>
    );
}
