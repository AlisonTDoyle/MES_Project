"use server"

import { OperatorLineStatus } from "@/app/_interfaces/response-objects/operator-line-status";
import { env } from "process"

const _apiUrl = env.NEXT_PUBLIC_API_URL + "/operator";

export async function GetOperatorsCurrentStatus(cognitoUsername: string): Promise<boolean> {
    let checkedIn: boolean = false;

    let response: OperatorLineStatus = await fetch(_apiUrl + `/${cognitoUsername}`).then((res) => res.json());
    checkedIn = response.checkedIn;

    return checkedIn;
}

export async function UpdateOperatorsStatus(cognitoUsername: string, newStatus: number): Promise<boolean> {
    let updateSuccess: boolean = true;

    let response = await fetch(_apiUrl + `/${cognitoUsername}/line-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            operatorId: 1,
            lineId: 1,
            newStatus
        })
    });

    if (!response.ok) {
        return false;
    }

    return updateSuccess;
}