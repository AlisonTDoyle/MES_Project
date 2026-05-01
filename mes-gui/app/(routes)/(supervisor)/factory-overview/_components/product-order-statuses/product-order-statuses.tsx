import AutoRefresh from "@/app/(routes)/(misc-components)/refresh-component/refresh";
import { StatusPieChart } from "./status-pie-chart";

let apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function ProductOrderStatuses() {
    let data = [];
    try {
        const res = await fetch(`${apiUrl}/work-order/statuses`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        data = json.message || [];
    } catch (error) {
        console.error("Failed to fetch work order statuses:", error);
    }

    return (
        <>
            <AutoRefresh></AutoRefresh>
            <div className="card shadow-sm h-full min-h-72">
                <div className="card-body">
                    <span className="card-title">WO Statuses</span>
                    <StatusPieChart data={data}></StatusPieChart>
                </div>  
            </div>
        </>
    )
}