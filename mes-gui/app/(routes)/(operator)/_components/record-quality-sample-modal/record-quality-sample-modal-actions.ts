"use server"

import { Operator } from "@/app/_interfaces/operator";
import { QualitySample } from "@/app/_interfaces/quality-sample";

let _apiUrl: string = process.env.API_URL as string;

export async function GetOperator(cognitoUsername: string): Promise<Operator> {
    return await fetch(_apiUrl + `/operator/${cognitoUsername}`)
        .then((res) => res.json())
        .then((data) => data.data)
}

export async function SubmitNewSampleOrder(sample: QualitySample) {
    let successfulPublish: boolean = true;

    try {
        let url = _apiUrl + `/quality-sample`;

        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sample),
        });

        if (!response.ok) {
            successfulPublish = false;
        }
    } catch (error) {
        successfulPublish = false;
    }

    return successfulPublish;
}