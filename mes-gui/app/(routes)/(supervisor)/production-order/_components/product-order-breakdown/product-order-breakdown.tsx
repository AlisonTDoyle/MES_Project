import { ProductionOrderResponse } from "@/app/_interfaces/response-objects/production-order";

export function ProductOrderBreakdown ({ productionOrder }: { productionOrder: ProductionOrderResponse }) {

    return (
        <div className="card bg-base-100 card-md shadow-sm h-full">
            <div className="card-body">
                <h3 className="card-title">Order Breakdown</h3>
                <div className="overflow-x-auto">
                    <table className="table table-xs rounded-box border border-base-content/5">
                        <thead>
                            <tr>
                                <th>Item Number</th>
                                <th>Part Number</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productionOrder.products.map((prod:any) => (
                                <tr key={prod.id}>
                                    <td>{prod.id}</td>
                                    <td>{prod.partNumber}</td>
                                    <td>{prod.description}</td>
                                    <td>{prod.quantity}</td>
                                    <td>{prod.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}