import { BreakdownType } from "@/app/_interfaces/breakdown-type";
import { MachineEvent } from "@/app/_interfaces/machine-breakdown";
import { MachineEventListItem } from "./machine-event-list-item";

export async function MachineEventHistory() {
    const response = await fetch("http://localhost:3001/api/machine/1/events");
    const events = await response.json();

    return (
        <div className="flex h-full flex-col min-h-0">
            <h3 className="shrink-0 pb-2">
                Machine History
            </h3>

            <ul className="flex-1 min-h-0 overflow-y-auto">
                {events.map(e => (
                    <li key={e.id}>
                        <MachineEventListItem MachineEvent={e} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
