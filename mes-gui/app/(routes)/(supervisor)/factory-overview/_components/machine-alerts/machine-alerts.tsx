import { MachineEventAlert } from "@/app/_interfaces/machine-event-alert";
import { AlertTableItem } from "./alert-table-item";

export async function MachineAlerts() {
    const _apiUrl = process.env.NEXT_PUBLIC_API_URL;
    let _machineEventAlert: MachineEventAlert[] = [];

    if (!_apiUrl) {
        console.error("Missing API_URL environment variable");
    } else {
        try {
            const _response = await fetch(`${_apiUrl}/machine-event/recent`);

            if (!_response.ok) {
                console.error("Failed to fetch machine event alerts", {
                    status: _response.status,
                    statusText: _response.statusText,
                });
            } else {
                const data = await _response.json();
                if (Array.isArray(data)) {
                    _machineEventAlert = data as MachineEventAlert[];
                } else {
                    console.warn("Unexpected machine event alert response shape", data);
                }
            }
        } catch (error) {
            console.error("Error fetching machine event alerts", error);
        }
    }

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
