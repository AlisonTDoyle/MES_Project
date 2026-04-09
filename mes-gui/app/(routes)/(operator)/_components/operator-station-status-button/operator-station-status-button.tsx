"use client";
export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react";
import { ClockIcon } from '@heroicons/react/24/solid'
import { fetchAuthSession } from "aws-amplify/auth";
import { GetOperatorsCurrentStatus, UpdateOperatorsStatus } from "./operator-station-status-button-actions"

export default function OperatorStationStatusButton() {
    const buttonTextOptions: string[] = ["Check into Station", "Check out of Station"];
    const [checkedIntoStation, setCheckedIntoStation] = useState(false);
    const [buttonText, setButtonText] = useState(buttonTextOptions[0]);
    const [operatorCognitoUsername, setOperatorCognitoUsername] = useState<string>();

    useEffect(() => {
        async function getOperatorDetails() {
            const session = await fetchAuthSession();
            let cognitoUsername = session.userSub as string;

            setOperatorCognitoUsername(cognitoUsername);
        }

        async function getCurrentStatus() {
            let status: boolean = await GetOperatorsCurrentStatus(operatorCognitoUsername as string)
            console.log("Status: " + status)
            setCheckedIntoStation(status);
        }

        async function prepareStausButton() {
            await getOperatorDetails();
            await getCurrentStatus();
        }

        prepareStausButton();
    }, []);

    async function ChangeStationStatus() {
        // flip current checked state
        const newStatus = checkedIntoStation ? 0 : 1;

        // update backend
        let updateSuccess:boolean = await UpdateOperatorsStatus(operatorCognitoUsername as string, newStatus);

        if (!updateSuccess) {
            alert("Failed to update station status");
            return;
        }

        // update UI
        setCheckedIntoStation(newStatus === 1);
        setButtonText(newStatus === 1 ? "Check out of Station" : "Check into Station");
    }

    return (
        <button className="btn btn-soft btn-primary mb-2 w-full" onClick={ChangeStationStatus}>
            <ClockIcon className="w-5 h-5" />
            <span>{buttonText}</span>
        </button>
    )
}