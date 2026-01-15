import { OeeGraph } from "./oee-graph";

export function OperatorOee() {
    return (
        <div className="h-full">
            <h3>OEE</h3>
            <ul>
                <li>Availability: 3489032</li>
                <li>Quality: 42908490</li>
                <li>Quantity: 402748</li>
            </ul>
            <OeeGraph></OeeGraph>
        </div>
    )
}