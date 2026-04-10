"use server"

import { WorkOrder } from "@/app/_interfaces/work-order"

const _apiUrl: string = process.env.API_URL as string + "/production-order"
const _assemblyStage: number = 4;

export async function GetWorkOrderInAssemblyStage(productionOrderId: number): Promise<WorkOrder[]> {
    let workOrders: WorkOrder[] = [];

    let url = _apiUrl + `/${productionOrderId}/stage/${_assemblyStage}`;

    let response = await fetch(url).then(res => res.json()).then((data) => data.data);
    workOrders = response ? response : [];

    return workOrders;
}