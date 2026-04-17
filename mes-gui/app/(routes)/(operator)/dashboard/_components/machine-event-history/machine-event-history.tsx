import { MachineEventListItem } from "./machine-event-list-item";
import { MachineEventAlert } from "@/app/_interfaces/machine-event-alert";
import AutoRefresh from "@/app/(routes)/(misc-components)/refresh-component/refresh";
export const dynamic = 'force-dynamic'

export async function MachineEventHistory() {
    let events: MachineEventAlert[] = [];

    try {
        let response = await fetch("http://localhost:3001/api/machine/5621/events");
        events = await response.json() || [];
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
                        {events.map((e:any) => (
                            <MachineEventListItem key={e.id} MachineEvent={e} />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
