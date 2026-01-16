import { WorkOrder } from "@/app/_interfaces/work-order";
import { WorkOrderListItem } from "./work-order-list-item";

export default async function UpcomingWorkOrders() {
    const response = await fetch("http://localhost:3001/api/operator/1/work-order");
    const parsedRes:{data:[]} = await response.json();
    const workOrders: WorkOrder[] = parsedRes.data;

    return (
        <div className="card shadow-sm bg-base-100 flex h-full flex-col min-h-0">
            <div className="card-body overflow-hidden">
                <span className="card-title shrink-0 pb-2">Upcoming Work Orders</span>
                <ul className="flex-1 min-h-0 overflow-y-auto">
                    {workOrders.map((workOrder) => (
                        <li key={workOrder.id}>
                            <WorkOrderListItem workOrder={workOrder}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}