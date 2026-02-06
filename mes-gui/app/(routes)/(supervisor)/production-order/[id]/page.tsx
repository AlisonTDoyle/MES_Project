import { ProductionOrderResponse } from "@/app/_interfaces/response-objects/production-order";
import { ProductOrderBreakdown } from "./../_components/product-order-breakdown/product-order-breakdown";
import { ProductOrderDetails } from "./../_components/product-order-details/product-order-detalis";
import { ProductionStages } from "./../_components/production-stages/production-stages";
import React from 'react'

export default async function ProductionOrderPage({
  params,
  searchParams
}: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const p = await (params);
  let poId = p.id

  const response = await fetch(
    `http://localhost:3001/api/production-order/${poId}`,
    { cache: 'no-store' } // optional, but common for data fetches
  );

  const productionOrder: ProductionOrderResponse = await response.json()

  return (
    <div className="grid h-screen grid-rows-[33%_66%] xl:grid-cols-[25%_75%]">
      <div className="m-4 mb-2">
        <ProductOrderDetails productionOrder={productionOrder} />
      </div>

      <div className="m-4 mb-2">
        <ProductOrderBreakdown productionOrder={productionOrder} />
      </div>

      <div className="m-4 mt-2 xl:col-span-2">
        <ProductionStages />
      </div>
    </div>
  )
}
