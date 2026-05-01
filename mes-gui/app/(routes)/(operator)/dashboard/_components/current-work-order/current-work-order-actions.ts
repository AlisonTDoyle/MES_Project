"use server"

import { Machine } from "@/app/_interfaces/machine";
import { Operator } from "@/app/_interfaces/operator";
import { WorkOrder } from "@/app/_interfaces/work-order";


let apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GetOperator(cognitoUsername: string): Promise<Operator> {
    return await fetch(apiUrl + `/operator/${cognitoUsername}`)
        .then((res) => res.json())
        .then((data) => data.data)
}

export async function GetCurrentWorkOrder(operatorId: number): Promise<WorkOrder | null> {
    const machineRes = await fetch(apiUrl + `/operator/${operatorId}/machine`)
        .then((res) => res.json());
    
    const machine: Machine | null = machineRes.data ?? null;
    console.log(`Machine: ${JSON.stringify(machine)}`);

    if (!machine?.id) return null;

    const url = `${apiUrl}/machine/${machine.id}/current-work-order`;
    console.log(url);

    const res = await fetch(url).then((response) => response.json());
    console.log(res);
    console.log("In GetCurrentWorkOrder");

    return res;
}