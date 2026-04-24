"use server"

import { Operator } from "@/app/_interfaces/operator";
import { WorkOrder } from "@/app/_interfaces/work-order";


let apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GetOperator(cognitoUsername: string): Promise<Operator> {
    return await fetch(apiUrl + `/operator/${cognitoUsername}`)
        .then((res) => res.json())
        .then((data) => data.data)
}

export async function GetWorkOrder(operatorId: number): Promise<WorkOrder> {
    let res:any =  await fetch(`${apiUrl}/operator/${operatorId}/current-work-order`)
        .then((response) => response.json());

    console.log(res)

    return res;
}