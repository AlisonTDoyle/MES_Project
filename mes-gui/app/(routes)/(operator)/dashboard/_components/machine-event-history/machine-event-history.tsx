import { BreakdownType } from "@/app/_interfaces/breakdown-type";
import { MachineEvent } from "@/app/_interfaces/machine-breakdown";
import { MachineEventListItem } from "./machine-event-list-item";

export async function MachineEventHistory() {
    const response = await fetch("http://localhost:3001/api/machine/1/events");
    const events: MachineEvent[] = await response.json();

    return (
        <div>
            <h3>Machine History</h3>
            <ul>
                {events.map(e => (
                    <li>
                        <MachineEventListItem MachineEvent={e}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}