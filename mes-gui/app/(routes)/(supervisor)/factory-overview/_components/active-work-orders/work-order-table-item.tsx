"use client";

import { useRouter } from "next/navigation";
import { WorkOrder } from "@/app/_interfaces/work-order";

export function WorkOrderTableItem({ workOrder }: { workOrder: WorkOrder }) {
    let status: string = workOrder.completed ? "Completed" : "Incomplete";
    let badge: string = workOrder.completed ? "badge-success" : "badge-danger";
    let router = useRouter();


    return (
        <tr
            key={workOrder.id}
            onClick={() => router.push(`/production-order/1`)}
            className="p-1 hover:cursor-pointer hover:bg-base-200"
        >
            <td>{workOrder.id}</td>
            <td>1234567890</td>
            <td>
                <span className={badge}>{status}</span>
            </td>
            <td>{workOrder.description}</td>
            <td>{new Date(workOrder.scheduleDate).toLocaleDateString()}</td>
        </tr>
    )
}