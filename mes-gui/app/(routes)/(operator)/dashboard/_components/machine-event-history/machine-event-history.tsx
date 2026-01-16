import { BreakdownType } from "@/app/_interfaces/breakdown-type";
import { MachineEvent } from "@/app/_interfaces/machine-breakdown";
import { MachineEventListItem } from "./machine-event-list-item";

export async function MachineEventHistory() {
    const response = await fetch("http://localhost:3001/api/machine/1/events");
    const events = await response.json();

    return (
        <div className="card shadow-sm bg-base-100 flex h-full flex-col min-h-0">
            <div className="card-body overflow-hidden">
                <span className="card-title shrink-0 pb-2">
                    Machine History
                </span>
                <ul className="list flex-1 min-h-0 overflow-y-auto">
                    {events.map(e => (
                        <MachineEventListItem MachineEvent={e} />
                    ))}
                </ul>
            </div>
        </div>
    );
}
