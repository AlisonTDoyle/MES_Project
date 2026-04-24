"use server"

import { Operator } from "@/app/_interfaces/operator";

let apiUrl:string = process.env.NEXT_PUBLIC_API_URL as string;

export async function GetMachineEventTypes() {
    return await fetch(apiUrl + "/machine-event/type")
        .then((res) => res.json())
        .then((data) => data.data)
}

export async function GetOperator(cognitoUsername:string):Promise<Operator> {
    return await fetch(apiUrl + `/operator/${cognitoUsername}`)
        .then((res) => res.json())
        .then((data) => data.data)
}