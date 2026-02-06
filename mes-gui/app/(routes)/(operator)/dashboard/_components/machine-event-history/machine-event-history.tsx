import { BreakdownType } from "@/app/_interfaces/breakdown-type";
import { MachineEvent } from "@/app/_interfaces/machine-breakdown";
import { MachineEventListItem } from "./machine-event-list-item";

export async function MachineEventHistory() {
    const historyResponse = await fetch("http://localhost:3001/api/machine/1/events");
    const events = await historyResponse.json();
    let machineEventTypes = await fetch("http://localhost:3001/api/machine-event/type").then(res => res.json()).then(data => data.data);

    return (
        <div className="card shadow-sm bg-base-100 flex h-full flex-col min-h-0">
            <div className="card-body overflow-hidden">
                <span className="card-title shrink-0 pb-2">
                    Machine History
                </span>
                <ul className="list flex-1 min-h-0 overflow-y-auto">
                    {events.map((e:any) => (
                        <MachineEventListItem MachineEvent={e} breakdownTypes={machineEventTypes} />
                    ))}
                </ul>
            </div>
        </div>
    );
}
