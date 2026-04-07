import { StatusPieChart } from "./status-pie-chart";

export async function ProductOrderStatuses() {
    let data = [];
    try {
        const res = await fetch("http://localhost:3001/api/work-order/statuses");
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        data = json.message || [];
    } catch (error) {
        console.error("Failed to fetch work order statuses:", error);
        // Optionally, set a default or handle error state
    }

    return (
        <div className="card shadow-sm h-full min-h-72">
            <div className="card-body">
                <span className="card-title">WO Statuses</span>
                <StatusPieChart data={data}></StatusPieChart>
            </div>
        </div>
    )
}