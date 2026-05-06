"use client"

import { MachineEventListItem } from "./machine-event-list-item";
import { MachineEventAlert } from "@/app/_interfaces/machine-event-alert";
import AutoRefresh from "@/app/(routes)/(misc-components)/refresh-component/refresh";
import { useEffect, useState } from "react";
import { GetMachineHistory, GetOperator } from "./machine-event-history-actions";
import { Operator } from "@/app/_interfaces/operator";
import { fetchAuthSession } from "aws-amplify/auth";
export const dynamic = 'force-dynamic'

let apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function MachineEventHistory() {
    let [events, setEvents] = useState<MachineEventAlert[]>([]);

    useEffect(() => {
        async function getMachineHistory() {
            // get user cognito id
            const session = await fetchAuthSession();
            let cognitoUsername = session.userSub as string;
            let op:Operator = await GetOperator(cognitoUsername);
            let eventHistory:MachineEventAlert[] = await GetMachineHistory(op.id);
            setEvents(eventHistory)
        }

        getMachineHistory();
    }, []);
    
    return (
        <>
            <AutoRefresh></AutoRefresh>
            <div className="card shadow-sm bg-base-100 flex h-100 lg:h-full flex-col min-h-0">
                <div className="card-body overflow-hidden">
                    <span className="card-title shrink-0 pb-2">
                        Machine History
                    </span>
                    <ul className="list flex-1 min-h-0 overflow-y-auto">
                        {(events as Array<any>).map((e:any) => (
                            <MachineEventListItem key={e.id} MachineEvent={e} />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
