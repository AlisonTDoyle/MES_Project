"use client";

import { MouseEventHandler, MouseEvent, useState } from "react";
import {ArrowRightStartOnRectangleIcon} from '@heroicons/react/24/solid'

export default function OperatorStationStatusButton() {
    let signedIn: number = 0;

    const buttonTextOptions: string[] = ["Check into Station", "Check out of Station"];
    const [checkedIntoStation, setCheckedIntoStation] = useState(false);
    const [buttonText, setButtonText] = useState(buttonTextOptions[0]);

    async function ChangeStationStatus(event: MouseEvent<HTMLButtonElement>): Promise<void> {
        let currentStatus = await CheckCurrentStatus();
        setCheckedIntoStation(currentStatus == 1 ? true : false);
        setButtonText(currentStatus == 1 ? buttonTextOptions[0] : buttonTextOptions[1]);

        signedIn = currentStatus == 1 ? 0 : 1
        console.log(`newCheckedState: ${currentStatus}, signedIn: ${signedIn}`)

        // update status
        await fetch("/api/operator/1/line-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "operatorId": 1,
                "lineId": 1,
                "newStatus": signedIn
            }),
        });
    }

    async function CheckCurrentStatus() {
        let response = await fetch("/api/operator/1/line-status");

        const data = await response.json();
        let currentStatus = data.result != null ? data.result.eventType : 0

        return currentStatus;
    }

    return (
        <button onClick={ChangeStationStatus} className="btn-danger w-full">{buttonText}</button>
    )
}