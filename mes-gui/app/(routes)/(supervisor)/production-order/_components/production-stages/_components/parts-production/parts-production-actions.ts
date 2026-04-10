"use server"

import { WorkOrder } from "@/app/_interfaces/work-order"

const _apiUrl: string = process.env.API_URL as string + "/production-order"

export async function GetWorkOrderInManufacturingStage(
    productionOrderId: number,
    stages: number[]
): Promise<WorkOrder[]> {

    let workOrders: WorkOrder[] = [];

    for (let i = 0; i < stages.length; i++) {
        let url = _apiUrl + `/${productionOrderId}/stage/${stages[i]}`;

        let response = await fetch(url).then(res => res.json()).then((data) => data.data);
        workOrders.push(...response);
    }

    return workOrders;
}