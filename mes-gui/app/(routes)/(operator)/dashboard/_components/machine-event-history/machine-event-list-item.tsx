import { MachineEventAlert } from "@/app/_interfaces/machine-event-alert";
import { ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/solid"

export function MachineEventListItem({ MachineEvent }: { MachineEvent: MachineEventAlert }) {
    let shortenedDescription: () => string = () => {
        let newDesc: string = "";

        if ((MachineEvent.description as string).length > 147) {
            newDesc = (MachineEvent.description as string).slice(0, 100);
            newDesc += "...";
        } else {
            newDesc = MachineEvent.description as string;
        }

        return newDesc;
    }

    return (
        <li className="list-row">
            <div>
                {MachineEvent.type === "Breakdown" ? (
                    <span className="badge badge-soft badge-error h-full" title="Breakdown"><ExclamationCircleIcon className="h-8 w-8" /></span>
                ) : MachineEvent.type === "Maintenance" ? (
                    <span className="badge badge-soft badge-warning h-full" title="Maintenance"><ExclamationCircleIcon className="h-8 w-8" /></span>
                ) : (
                    <span className="badge badge-soft badge-info h-full" title="Fault Notice"><InformationCircleIcon className="h-8 w-8" /></span>
                )}
            </div>
            <div>
                <b>Machine {MachineEvent.machineId} has broken down</b>
                <p className="opacity-70">{MachineEvent.issue || "Unknown"} Issue</p>
                <p className="opacity-70">{new Date(MachineEvent.timestamp).toISOString()}</p>
                <p>{shortenedDescription()}</p>
            </div>
        </li>
    )
}
