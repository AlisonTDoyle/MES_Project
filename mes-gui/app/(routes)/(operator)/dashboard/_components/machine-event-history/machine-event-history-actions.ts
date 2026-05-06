"use server"

import { Machine } from "@/app/_interfaces/machine";
import { MachineEventAlert } from "@/app/_interfaces/machine-event-alert";
import { Operator } from "@/app/_interfaces/operator";

let apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GetOperator(cognitoUsername: string): Promise<Operator> {
    return await fetch(apiUrl + `/operator/${cognitoUsername}`)
        .then((res) => res.json())
        .then((data) => data.data)
}

export async function GetMachineHistory(operatorId: number): Promise<MachineEventAlert[]> {
    const machineRes = await fetch(apiUrl + `/operator/${operatorId}/machine`)
        .then((res) => res.json());
    
    const machine: Machine | null = machineRes.data ?? null;
    console.log(`Machine: ${JSON.stringify(machine)}`);

    if (!machine?.id) return [];

    const url = `${apiUrl}/machine/${machine.id}/events`;

    const res = await fetch(url).then((response) => response.json());
    // console.log(res)
    // let data = await res.json();
    let events:MachineEventAlert[] = res || [];

    return events;
}