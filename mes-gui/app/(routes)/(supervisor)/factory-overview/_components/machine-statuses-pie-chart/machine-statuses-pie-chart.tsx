import AutoRefresh from "@/app/(routes)/(misc-components)/refresh-component/refresh";
import { StatusPieChart } from "./status-pie-chart";
import { MachineAvailability } from "@/app/_interfaces/response-objects/machine-availability";
import dotenv from "dotenv";

dotenv.config()
let apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function MachineStatusesPieChart() {
    let data:MachineAvailability[] = [];
    try {
        const res = await fetch(`${apiUrl}/factory/machine-availability`, { cache: 'no-store' });
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
        <>
            <AutoRefresh></AutoRefresh>
            <div className="card shadow-sm h-full min-h-72">
                <div className="card-body">
                    <span className="card-title">Machine Statuses</span>
                    <StatusPieChart data={data}></StatusPieChart>
                </div>
            </div>
        </>
    )
}