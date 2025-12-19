'use server';

import { FormEvent } from "react";

export async function SubmitBreakdown(formData: FormData): Promise<void> {
    

    // get data from form
    let machineId = formData.get("machineId") as string;
    let reportingOperatorId: number = 1;
    let description = formData.get("description") as string;
    let breakdownTypeId = formData.get("breakdownTypeId") as string;

    // send info to api
    await fetch("http://localhost:3000/api/breakdown/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "machineId": machineId,
            "reportingOperatorId": reportingOperatorId,
            "description": description,
            "type": breakdownTypeId
        })
    })
}