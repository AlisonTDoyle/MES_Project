import { ProductionOrderTableItem } from "./production-order-table-item";
import { ProductionOrder } from "@/app/_interfaces/production-order/production-order";

export async function ActiveWorkOrders() {
    const response = await fetch("http://localhost:3001/api/production-order");
    const parsedRes = await response.json();
    const productionOrders: ProductionOrder[] = parsedRes || [];

    return (
        <div className="card shadow-sm h-full">
            <div className="card-body">
                <span className="card-title">Active Production Orders</span>
                <table className="table table-xs rounded-box border border-base-content/5 overflow-auto table-pin-rows">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer Name</th>
                            <th>State</th>
                            <th>Order Date</th>
                            <th>Deadline</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productionOrders.map(po => (<ProductionOrderTableItem productionOrder={po}></ProductionOrderTableItem>))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}