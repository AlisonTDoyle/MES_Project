import { BreakdownType } from "@/app/_interfaces/breakdown-type";
import { MachineEvent } from "@/app/_interfaces/machine-breakdown";
import { WrenchIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export function MachineEventListItem({ MachineEvent, breakdownTypes }: { MachineEvent: MachineEvent; breakdownTypes: BreakdownType[] }) {
    let shortenedDescription: () => string = () => {
        let newDesc: string = "";

        if (MachineEvent.description.length > 147) {
            newDesc = MachineEvent.description.slice(0, 100);
            newDesc += "...";
        } else {
            newDesc = MachineEvent.description
        }

        return newDesc;
    }

    let resolvedBadgeStyling:string = "my-1 badge badge-soft";

    switch(MachineEvent.resolved) {
        case (true):
            resolvedBadgeStyling+=" badge-success";
            break;
        case(false):
            resolvedBadgeStyling+=" badge-error";
            break;
    }

    return (
        <li className="list-row">
            <div>
                {
                    MachineEvent.eventType == 1 || MachineEvent.eventType == 2 ?
                        MachineEvent.eventType == 1 ?
                            <ExclamationTriangleIcon className='text-error h-5 w-5' />
                            :
                            <ExclamationTriangleIcon className='text-warning h-5 w-5' />
                        :
                        <WrenchIcon className='text-warning h-5 w-5' />
                }
            </div>
            <div>
                <div>
                    <div>{shortenedDescription()}</div>
                    <div className="text-xs font-semibold opacity-60">{new Date(MachineEvent.timestamp).toISOString()}</div>
                    <span className={resolvedBadgeStyling}>{MachineEvent.resolved? "Resolved":"Unresolved"}</span>
                    <span className="badge badge-soft badge-primary mx-2 my-1">{breakdownTypes[MachineEvent.eventType]?.description || "Unknown"}</span>
                </div>
            </div>
        </li>
    )
}
