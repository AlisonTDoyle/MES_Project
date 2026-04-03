import { WorkOrder } from "@/app/_interfaces/work-order";
import { WorkOrderListItem } from "./work-order-list-item";

export default async function UpcomingWorkOrders() {
    let workOrders: WorkOrder[] = [];

    try {
        let response = await fetch("http://localhost:3001/api/operator/1/work-order");
        const json = await response.json();
        workOrders = Array.isArray(json) ? json : [];
    } catch (error) {
        workOrders = [];
    }

    return (
        <div className="card shadow-sm bg-base-100 flex h-100 lg:h-full flex-col min-h-0">
            <div className="card-body overflow-hidden">
                <span className="card-title shrink-0 pb-2">Upcoming Work Orders</span>
                <ul className="list flex-1 min-h-0 overflow-y-auto">
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