import { ProductionOrderTableItem } from "./production-order-table-item";
import { ProductionOrder } from "@/app/_interfaces/production-order/production-order";

export async function ActiveWorkOrders() {
    const response = await fetch("http://localhost:3001/api/production-order");
    const parsedRes = await response.json();
    const productionOrders: ProductionOrder[] = parsedRes || [];

    return (
        <div className="card shadow-sm h-full">
            <div className="card-body overflow-y-auto">
                <span className="card-title">Active Production Orders</span>
                <div className="overflow-x-auto">
                    <table className="table table-xs table-pin-rows table-pin-cols">
                        <thead>
                            <tr>
                                <th>PO #</th>
                                <th>Customer Name</th>
                                <th>State</th>
                                <th>Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productionOrders.map(po => (<ProductionOrderTableItem key={po.id} productionOrder={po}></ProductionOrderTableItem>))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}