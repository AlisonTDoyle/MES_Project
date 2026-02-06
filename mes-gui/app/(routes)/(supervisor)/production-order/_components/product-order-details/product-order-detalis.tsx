import { ProductionOrder } from "@/app/_interfaces/production-order/production-order";
import { ProductionOrderResponse } from "@/app/_interfaces/response-objects/production-order";

export function ProductOrderDetails({ productionOrder }: { productionOrder: ProductionOrderResponse }) {
    return (
        <div className="card bg-base-100 card-md shadow-sm h-full">
            <div className="card-body">
                <h3 className="card-title">PO Details</h3>
                <table>
                    <tbody>
                        <tr>
                            <td><b>PO ID:</b></td>
                            <td>{productionOrder.orderInfo.id ? productionOrder.orderInfo.id : ""}</td>
                        </tr>
                        <tr>
                            <td><b>Customer:</b></td>
                            <td>{productionOrder.orderInfo.customerName}</td>
                        </tr>
                        <tr>
                            <td><b>Order Received:</b></td>
                            <td>{(new Date(productionOrder.orderInfo.orderPlacedOn)).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td><b>Deadline:</b></td>
                            <td>{productionOrder.orderInfo.deadline ? (new Date(productionOrder.orderInfo.deadline)).toLocaleDateString() : "N/A"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}