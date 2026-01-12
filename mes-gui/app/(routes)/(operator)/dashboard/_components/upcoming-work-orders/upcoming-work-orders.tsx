import { WorkOrder } from "@/app/_interfaces/work-order";
import { WorkOrderListItem } from "./work-order-list-item";

export default async function UpcomingWorkOrders() {
    const response = await fetch("http://localhost:3001/api/operator/1/work-order");
    const parsedRes:{data:[]} = await response.json();
    const workOrders: WorkOrder[] = parsedRes.data;

    return (
        <div>
            <h2>Upcoming Work Orders</h2>
            <ul>
                {workOrders.map((workOrder) => (
                    <li key={workOrder.id}>
                        <WorkOrderListItem workOrder={workOrder}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}