import { StatusPieChart } from "./status-pie-chart";

export async function ProductOrderStatuses() {
    let data: {stage: number, statusDescription: string, workOrderCount:number}[] = [];
    try {
        let res = await fetch("http://localhost:3001/api/work-order/statuses");
        let json = await res.json();
        data = Array.isArray(json.message) ? json.message : [];
    } catch (error) {
        // Handle fetch error during prerendering
        data = [];
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