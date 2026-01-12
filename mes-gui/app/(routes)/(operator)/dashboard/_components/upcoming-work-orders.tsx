"use server";

import { WorkOrder } from "@/app/_interfaces/work-order";

export default async function UpcomingWorkOrders() {
    let _workOrders:WorkOrder[] = await FetchUpcomingWorkOrders();

    async function FetchUpcomingWorkOrders(): Promise<WorkOrder[]> {
        let response = await fetch("http://localhost:3001/api/operator/1/work-order", { method: "GET" });
        const data = await response.json();

        if (data.result) {
            return data.result;
        } else {
            return [];
        }
    }

    return (
        <div>
            <p>count: {_workOrders.length}</p>

            <h2>Upcoming Work Orders</h2>
            <ul>
                {
                    _workOrders.map((order) => (
                        <li key={order.id}>
                            {order.description}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}