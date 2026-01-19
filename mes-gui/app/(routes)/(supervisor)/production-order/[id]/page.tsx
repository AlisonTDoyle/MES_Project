import { ProductOrderBreakdown } from "./../_components/product-order-breakdown/product-order-breakdown";
import { ProductOrderDetails } from "./../_components/product-order-details/product-order-detalis";
import { ProductionStages } from "./../_components/production-stages/production-stages";
export default function ProductionOrderPage() {
  let product

  return (
    <div className="grid h-screen grid-rows-[33%_66%] xl:grid-cols-[25%_75%]">
      <div className="m-4 mb-2">
        <ProductOrderDetails />
      </div>

      <div className="m-4 mb-2">
        <ProductOrderBreakdown />
      </div>

      <div className="m-4 mt-2 xl:col-span-2">
        <ProductionStages />
      </div>
    </div>
  )
}
