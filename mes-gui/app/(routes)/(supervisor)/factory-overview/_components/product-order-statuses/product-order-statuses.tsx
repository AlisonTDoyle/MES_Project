import { StatusPieChart } from "./status-pie-chart";

export async function ProductOrderStatuses() {
    let res = await fetch("http://localhost:3001/api/work-order/statuses");
    let json = await res.json();
    let data = json.message || [];

    return (
        <div className="card shadow-sm h-full min-h-72">
            <div className="card-body">
                <span className="card-title">WO Statuses</span>
                <StatusPieChart data={data}></StatusPieChart>
            </div>
        </div>
    )
}