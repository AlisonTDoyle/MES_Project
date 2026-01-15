import { MachineEvent } from "@/app/_interfaces/machine-breakdown";
import { WrenchIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export async function MachineEventListItem({MachineEvent}:{MachineEvent:MachineEvent}) {
    let resolvedBadgeStyling:string = MachineEvent.resolved? 'badge-success' : 'badge-danger';
    let shortenedDescription:() => string = () => {
        let newDesc:string = "";

        if (MachineEvent.description.length > 150) {
            newDesc = MachineEvent.description.slice(0, 100);
            newDesc+="...";
        } else {
            newDesc = MachineEvent.description
        }

        return newDesc;
    }

    return (
        <div className="tile tile-layer-2 grid grid-cols-[10%_90%] md:grid-cols-[5%_95%] mb-2">
            <div className="p-4">
                {
                    // choose icon based on whether its maintenance or some sort of fault/error
                    MachineEvent.eventType == 1 || MachineEvent.eventType == 2 ?
                        // if fault or error, choose color based on severity
                        MachineEvent.eventType == 1 ? 
                            // breakdown is red
                            <ExclamationTriangleIcon className='text-red-500'/>
                        :
                            // reported fault is amber
                            <ExclamationTriangleIcon className='text-amber-500'/>
                    :
                        <WrenchIcon className='text-amber-500'/>
                }
            </div>       
            <div>
                <b className="mb-1">{shortenedDescription()}</b>
                <p className="opacity-80 mb-1">Reported by {MachineEvent.reportingOperatorId} at {(new Date(MachineEvent.timestamp)).toISOString()}</p>
                <span className={resolvedBadgeStyling}>{MachineEvent.resolved? "Resolved":"Unresolved"}</span><span className="badge-stone mx-2">{MachineEvent.relatedIssue}</span>
            </div>     
        </div>
    )

}