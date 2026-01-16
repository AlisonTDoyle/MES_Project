import { MachineEvent } from "@/app/_interfaces/machine-breakdown"
import { AlertTableItem } from "./alert-table-item"
import { BreakdownType } from "@/app/_interfaces/breakdown-type"

export async function MachineAlerts() {
    let _apiUrl: string | undefined = process.env.API_URL;
    const _response = await fetch(`${_apiUrl}/machine-event/type`);
    const _parsedRes: { data: [] } = await _response.json();
    const _breakdownTypes:BreakdownType[] = _parsedRes.data;

    let data:MachineEvent[] = [
        {
            machineId:1,
            reportingOperatorId:90283444,
            description: "This is an error",
            timestamp: new Date(),
            resolved: false,
            relatedIssue:13,
            eventType:1
        },
        {
            machineId:3897321,
            reportingOperatorId:98230423,
            description: "Unable to drag in contents",
            timestamp: new Date(),
            resolved: false,
            relatedIssue:8,
            eventType:1
        },
        {
            machineId:3748913,
            reportingOperatorId:37892189,
            description: "PLC not turning on",
            timestamp: new Date(),
            resolved: false,
            relatedIssue:3,
            eventType:1
        }
    ]

    return (
        <div className="card shadow-sm h-full">
            <div className="card-body">
                <span className="card-title">Alerts</span>
                <ul className="list bg-base-100">
                    {data.map((breakdown) => (
                        <li className="list-row p-0" key={breakdown.id}>
                            <AlertTableItem breakdown={breakdown} types={_breakdownTypes}></AlertTableItem>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}