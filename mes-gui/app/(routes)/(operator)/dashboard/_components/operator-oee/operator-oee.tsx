import { OeeGraph } from "./oee-graph";

export function OperatorOee() {
    return (
        <div className="card shadow-sm h-full">
            <div className="card-body">
                <span className="card-title">OEE</span>
                <ul>
                    <li>Availability: 3489032</li>
                    <li>Quality: 42908490</li>
                    <li>Quantity: 402748</li>
                </ul>
                <OeeGraph></OeeGraph>
            </div>
        </div>
    )
}