import { LineGraph } from "./line-graph";

export function OutputTargetGraph() {
    return (
        <div className="card shadow-sm h-full min-h-72">
            <div className="card-body">
                <span className="card-title">Output VS Target</span>
                <LineGraph></LineGraph>
            </div>
        </div>
    )
}