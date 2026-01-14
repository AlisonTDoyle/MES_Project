import { WorkOrder } from "@/app/_interfaces/work-order";
import { WorkOrderTableItem } from "./work-order-table-item";

export async function ActiveWorkOrders() {
    const response = await fetch("http://localhost:3001/api/operator/1/work-order");
    const parsedRes: { data: [] } = await response.json();
    const workOrders: WorkOrder[] = parsedRes.data;

    return (
        <div>
            <h3>Active Work Orders</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer No.</th>
                        <th>State</th>
                        <th>Description</th>
                        <th>Schedules</th>
                    </tr>
                </thead>
                <tbody>
                    {workOrders.map(wo => (<WorkOrderTableItem workOrder={wo}></WorkOrderTableItem>))}
                </tbody>
            </table>
        </div>
    )
}