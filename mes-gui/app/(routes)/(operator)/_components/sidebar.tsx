"use client"

import Clock from "../dashboard/_components/clock/clock"
import OperatorStationStatusButton from "./operator-station-status-button/operator-station-status-button"
import { ArrowRightStartOnRectangleIcon, ClockIcon } from '@heroicons/react/24/outline'
import { SidebarRecorderButtons } from "./sidebar-recorder-buttons";
import { signOut } from 'aws-amplify/auth';
import outputs from "./../../../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { useRouter } from "next/navigation";
import { GetCurrentMachine, GetMachineEventTypes, GetOperator } from "./sidebar-actions";
import { fetchAuthSession } from "aws-amplify/auth";
import { Operator } from "@/app/_interfaces/operator";
import { useEffect, useState } from "react";
import { Machine } from "@/app/_interfaces/machine";

Amplify.configure(outputs);

export function OperatorSidebar() {
    let router = useRouter();
    let companyName = process.env.COMPANY_NAME
    let machineEventTypes = GetMachineEventTypes;

    const [operator, setOperator] = useState<Operator>();
    const [machine, setMachine] = useState<Machine>();

    useEffect(() => {
        async function getOperatorDetails() {
            const session = await fetchAuthSession();
            let cognitoUsername = session.userSub as string;

            let currentOperator = await GetOperator(cognitoUsername);
            setOperator(currentOperator);

            let m = await GetCurrentMachine(currentOperator.id)
            setMachine(m as unknown as Machine)
        }

        getOperatorDetails();
    }, []);

    async function handleSignOut() {
        await signOut();
        router.push("/authentication/log-in")
    }

    return (
        <div className="bg-base-100 w-80 p-4 shadow-lg h-full flex flex-col">
            <div className="flex flex-col flex-1 min-h-0">
                <div className="mb-4">
                    <h3 className="text-center font-bold">Hello, {operator?.firstName} {operator?.lastName}</h3>
                    <p className="text-center">{companyName}</p>
                </div>

                <div className="mb-4">
                    <b>Machine: </b>
                    <span>{machine as unknown as string}</span>
                </div>

                <SidebarRecorderButtons props={machineEventTypes}></SidebarRecorderButtons>
            </div>

            {/* BOTTOM MENU */}
            <div className="mt-auto">
                <div className="divider" />
                <div className="text-center mb-4 text-lg font-bold">
                    <Clock></Clock>
                </div>
                <OperatorStationStatusButton></OperatorStationStatusButton>
                <button className="btn btn-error w-full" onClick={handleSignOut}>
                    <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    )
}