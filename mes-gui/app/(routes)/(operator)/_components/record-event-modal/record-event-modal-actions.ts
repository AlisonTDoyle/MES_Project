"use server"

import { BreakdownType } from "@/app/_interfaces/breakdown-type";
import { MachineEvent } from "@/app/_interfaces/machine-breakdown";
import { Operator } from "@/app/_interfaces/operator";

let _apiUrl: string = process.env.NEXT_PUBLIC_API_URL as string;

export async function GetOperator(cognitoUsername: string): Promise<Operator> {
    return await fetch(_apiUrl + `/operator/${cognitoUsername}`)
        .then((res) => res.json())
        .then((data) => data.data)
}

export async function GetCurrentMachine(operatorId: number): Promise<number> {
    let machineId = 0;

    machineId = await fetch(_apiUrl + `/operator/${operatorId}/machine`)
        .then((res) => res.json())
        .then((data) => data.data.id)

    return machineId;
}

export async function GetIssues() {
    let issues:BreakdownType[] = []

    try {
        issues = await fetch(_apiUrl + `/machine-event/type`)
            .then((res) => res.json())
            .then((data) => data.data)
    } catch (e) {
        console.error(e)
    }

    return issues;
}

export async function SubmitMachineEvent(machineEvent: { machineId: number; reportingOperatorId: string | undefined; description: string; timestamp: Date; resolved: boolean; relatedIssue: number; eventType: number; }) {
    let successfullPublish: boolean = true;

    try {
        let url = _apiUrl + `/machine-event`;

        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(machineEvent),
        });

        if (!response.ok) {
            successfullPublish = false;
        }
    } catch (error) {
        console.log("ERROR:" + error)
        successfullPublish = false;
    }

    return successfullPublish;
}