import { MachineEventListItem } from "./machine-event-list-item";
import { MachineEventAlert } from "@/app/_interfaces/machine-event-alert";
import AutoRefresh from "@/app/(routes)/(misc-components)/refresh-component/refresh";
export const dynamic = 'force-dynamic'
import dotenv from "dotenv";

dotenv.config()
let apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function MachineEventHistory() {
    let events: MachineEventAlert[] = [];

    try {
        let response = await fetch(`${apiUrl}/machine/5621/events`);
        let data = await response.json();
        events = Array.isArray(data) ? data : [];
    } catch (e) {
        console.log("Error: Could not fetch machine event history information")
    }
    
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
