import { MachineEventAlert } from "@/app/_interfaces/machine-event-alert";
import { AlertTableItem } from "./alert-table-item";

export async function MachineAlerts() {
    const _apiUrl = process.env.API_URL;
    const _response = await fetch(`${_apiUrl}/machine-event/recent`);
    const _machineEventAlert: MachineEventAlert[] = (await _response.json()) || [];

    return (
        <div className="card shadow-sm h-full">
            <div className="card-body flex flex-col h-full min-h-0 p-3">
                <span className="card-title">Alerts</span>
                <div className="overflow-x-auto overflow-y-auto flex-1 min-h-0">
                    <ul className="list">
                        {_machineEventAlert.map((alert) => (
                            <div key={alert.id}>
                                <AlertTableItem alert={alert} />
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
