import { MachineBreakdown } from "@/app/_interfaces/machine-breakdown"
import { AlertTableItem } from "./alert-table-item"
import { BreakdownType } from "@/app/_interfaces/breakdown-type"

export async function MachineAlerts() {
    let _apiUrl: string | undefined = process.env.API_URL;
    const _response = await fetch(`${_apiUrl}/breakdown/type`);
    const _parsedRes: { data: [] } = await _response.json();
    const _breakdownTypes:BreakdownType[] = _parsedRes.data;

    let data:MachineBreakdown[] = [
        {
            mahcineId:1,
            reportingOperatorId:90283444,
            description: "This is an error",
            timestamp: new Date(),
            resolved: false,
            type:13
        },
        {
            mahcineId:3897321,
            reportingOperatorId:98230423,
            description: "Unable to drag in contents",
            timestamp: new Date(),
            resolved: false,
            type:8
        },
        {
            mahcineId:3748913,
            reportingOperatorId:37892189,
            description: "PLC not turning on",
            timestamp: new Date(),
            resolved: false,
            type:3
        }
    ]

    return (
        <div>
            <h3>Alerts</h3>
            <ul>
                {data.map((breakdown) => (
                    <li key={breakdown.id}>
                        <AlertTableItem breakdown={breakdown} types={_breakdownTypes}></AlertTableItem>
                    </li>
                ))}
            </ul>
        </div>
    )
}