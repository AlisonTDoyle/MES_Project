import { ProductOrderBreakdown } from "./_components/product-order-breakdown/product-order-breakdown";
import { ProductOrderDetails } from "./_components/product-order-details/product-order-detalis";
import { ProductionStages } from "./_components/production-stages/production-stages";

export default function ProductionOrderPage() {
    return (
        <div className="grid lg:grid-cols-[25%_75%] lg:grid-rows-2 h-full">
            <div className="m-2">
                <ProductOrderDetails />
            </div>
            <div className="m-2">
                <ProductOrderBreakdown></ProductOrderBreakdown>
            </div>
            <div className="m-2 lg:col-start-1 lg:col-span-2">
                <ProductionStages></ProductionStages>
            </div>
        </div>
    )
}