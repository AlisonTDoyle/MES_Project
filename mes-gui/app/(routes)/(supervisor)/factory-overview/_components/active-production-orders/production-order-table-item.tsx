"use client";

import { useRouter } from "next/navigation";
import { WorkOrder } from "@/app/_interfaces/work-order";
import { ProductionOrder } from "@/app/_interfaces/production-order/production-order";

export function ProductionOrderTableItem({ productionOrder }: { productionOrder: ProductionOrder }) {
    // let status: string = workOrder.completed ? "Completed" : "Incomplete";
    // let badge: string = workOrder.completed ? "badge-success" : "badge-danger";
    let router = useRouter();

    return (
        <tr
            onClick={() => router.push(`/production-order/${productionOrder.id}`)}
            className="p-1 hover:cursor-pointer hover:bg-base-200"
        >
            <td>{productionOrder.orderNumber}</td>
            <td>{productionOrder.customerName}</td>
            <td>{new Date(productionOrder.orderPlacedOn).toLocaleDateString()}</td>
        </tr>
    )
}