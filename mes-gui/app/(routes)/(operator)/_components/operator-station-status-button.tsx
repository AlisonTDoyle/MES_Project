"use client";

import { MouseEventHandler, MouseEvent, useState } from "react";
import { ArrowRightStartOnRectangleIcon, ClockIcon } from '@heroicons/react/24/solid'

export default function OperatorStationStatusButton() {
    let signedIn: number = 0;

    const buttonTextOptions: string[] = ["Check into Station", "Check out of Station"];
    const [checkedIntoStation, setCheckedIntoStation] = useState(false);
    const [buttonText, setButtonText] = useState(buttonTextOptions[0]);

    async function ChangeStationStatus() {
        // flip current checked state
        const newStatus = checkedIntoStation ? 0 : 1;

        // update backend
        const res = await fetch("http://localhost:3001/api/operator/1/line-status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                operatorId: 1,
                lineId: 1,
                newStatus
            }),
        });

        if (!res.ok) {
            alert("Failed to update station status");
            return;
        }

        // update UI
        setCheckedIntoStation(newStatus === 1);
        setButtonText(newStatus === 1 ? "Check out of Station" : "Check into Station");
    }


    async function CheckCurrentStatus() {
        let response = await fetch("http://localhost:3001/api/operator/1/line-status");

        const data = await response.json();
        let currentStatus = data.result != null ? data.result.eventType : 0

        return currentStatus;
    }

    return (
        <button className="btn btn-soft btn-primary mb-2 w-full" onClick={(e) => ChangeStationStatus(e)}>
            <ClockIcon className="w-5 h-5" />
            <span>{buttonText}</span>
        </button>
    )
}