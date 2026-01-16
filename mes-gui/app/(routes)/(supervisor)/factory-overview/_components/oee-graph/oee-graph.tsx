import { OeeRadialChart } from "./oee-radial-char";

export function OeeGraph() {
    return (
        <div className="card shadow-sm p-2 h-full min-h-72">
            <div className="card-body">
                <span className="card-title">OEE</span>
                <div>
                    <p className="relative"><b>Availability:</b> <span className="absolute right-0">XXX</span></p>
                    <p className="relative"><b>Performance:</b> <span className="absolute right-0">XXX</span></p>
                    <p className="relative"><b>Quality:</b> <span className="absolute right-0">XXX</span></p>
                </div>
                <OeeRadialChart></OeeRadialChart>
            </div>
        </div>
    )
}