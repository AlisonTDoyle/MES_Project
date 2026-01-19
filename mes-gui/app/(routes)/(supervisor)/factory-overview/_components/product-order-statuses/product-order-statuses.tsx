import { StatusPieChart } from "./status-pie-chart";

export function ProductOrderStatuses() {
    return (
        <div className="card shadow-sm h-full min-h-72">
            <div className="card-body">
                <span className="card-title">PO Statuses</span>
                <StatusPieChart></StatusPieChart>
            </div>
        </div>
    )
}