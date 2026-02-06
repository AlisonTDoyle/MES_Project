"use client";

import { useRouter } from "next/navigation";
import { WorkOrder } from "@/app/_interfaces/work-order";
import { ProductionOrder } from "@/app/_interfaces/production-order/production-order";

export function ProductionOrderTableItem({ productionOrder }: { productionOrder: ProductionOrder }) {
    // let status: string = workOrder.completed ? "Completed" : "Incomplete";
    // let badge: string = workOrder.completed ? "badge-success" : "badge-danger";
    let router = useRouter();

    console.log(productionOrder)

    return (
        <tr
            key={productionOrder.id}
            onClick={() => router.push(`/production-order/${productionOrder.id}`)}
            className="p-1 hover:cursor-pointer hover:bg-base-200"
        >
            <td>{productionOrder.id}</td>
            <td>{productionOrder.customerName}</td>
            <td>
                state
            </td>
            <td>{new Date(productionOrder.orderPlacedOn).toLocaleDateString()}</td>
            <td>{productionOrder.deadline ? (productionOrder.deadline).toLocaleDateString() : "N/A"}</td>
        </tr>
    )
}