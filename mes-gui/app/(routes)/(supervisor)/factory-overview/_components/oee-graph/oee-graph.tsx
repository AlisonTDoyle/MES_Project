import { OeeFigures } from "@/app/_interfaces/response-objects/oee-figures";
import { OeeRadialChart } from "./oee-radial-char";
import { FetchOeeFigures } from "./oee-graph-actions";

export async function OeeGraph() {
    let oeeFigures = await FetchOeeFigures();

    return (
        <div className="card shadow-sm p-2 h-full min-h-72">
            <div className="card-body">
                <span className="card-title">OEE</span>
                <div>
                    <p className="relative"><b>Availability:</b> <span className="absolute right-0">{`${oeeFigures?.availability}%` || "N/A"}</span></p>
                    <p className="relative"><b>Performance:</b> <span className="absolute right-0">{`${oeeFigures?.performance}%` || "N/A"}</span></p>
                    <p className="relative"><b>Quality:</b> <span className="absolute right-0">{`${oeeFigures?.quality}%` || "N/A"}</span></p>
                </div>
                <OeeRadialChart data={oeeFigures}></OeeRadialChart>
            </div>
        </div>
    )
}