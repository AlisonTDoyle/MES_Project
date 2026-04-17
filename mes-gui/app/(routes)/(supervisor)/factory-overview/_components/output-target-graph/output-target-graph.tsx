import AutoRefresh from "@/app/(routes)/(misc-components)/refresh-component/refresh";
import { LineGraph } from "./line-graph";
import {FactoryEvent} from "./../../../../../_interfaces/factory-event";

export async function OutputTargetGraph() {
    let data:FactoryEvent[] = [];
    try {
        const res = await fetch("http://localhost:3001/api/factory/todays-output", { cache: 'no-store' });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        data = json.message || [];
    } catch (error) {
        console.error("Failed to fetch factory outputs:", error);
        // Optionally, set a default or handle error state
    }

    return (
        <>
            <AutoRefresh></AutoRefresh>
            <div className="card shadow-sm h-full min-h-72">
                <div className="card-body">
                    <span className="card-title">Factory Hourly Output</span>
                    <LineGraph events={data}></LineGraph>
                </div>
            </div>
        </>
    )
}