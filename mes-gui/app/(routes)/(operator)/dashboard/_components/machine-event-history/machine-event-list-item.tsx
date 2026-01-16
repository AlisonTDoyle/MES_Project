import { MachineEvent } from "@/app/_interfaces/machine-breakdown";
import { WrenchIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export async function MachineEventListItem({ MachineEvent }: { MachineEvent: MachineEvent }) {
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
                    // choose icon based on whether its maintenance or some sort of fault/error
                    MachineEvent.eventType == 1 || MachineEvent.eventType == 2 ?
                        // if fault or error, choose color based on severity
                        MachineEvent.eventType == 1 ?
                            // breakdown is red
                            <ExclamationTriangleIcon className='text-error h-5 w-5' />
                            :
                            // reported fault is amber
                            <ExclamationTriangleIcon className='text-warning h-5 w-5' />
                        :
                        <WrenchIcon className='text-warning h-5 w-5' />
                }
            </div>
            <div>
                <div>
                    <div>{shortenedDescription()}</div>
                    <div className="text-xs font-semibold opacity-60">{MachineEvent.timestamp}</div>
                    <span className={resolvedBadgeStyling}>{MachineEvent.resolved? "Resolved":"Unresolved"}</span><span className="badge-stone mx-2">{MachineEvent.relatedIssue}</span>
                </div>
            </div>
        </li>
        // <div className="tile tile-layer-2 grid grid-cols-[10%_90%] md:grid-cols-[5%_95%] mb-2">

        //     <div>
        //         <b className="mb-1">{shortenedDescription()}</b>
        //         <p className="opacity-80 mb-1">Reported by {MachineEvent.reportingOperatorId} at {(new Date(MachineEvent.timestamp)).toISOString()}</p>
        //         <span className={resolvedBadgeStyling}>{MachineEvent.resolved? "Resolved":"Unresolved"}</span><span className="badge-stone mx-2">{MachineEvent.relatedIssue}</span>
        //     </div>     
        // </div>
    )

}