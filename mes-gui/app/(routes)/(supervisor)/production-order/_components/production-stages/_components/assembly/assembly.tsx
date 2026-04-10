import { WorkOrder } from "@/app/_interfaces/work-order";
import { GetWorkOrderInAssemblyStage } from "./assembly-actions";

export async function Assembly({ productionOrderId }: { productionOrderId: number }) {
    const STATUS_DESCRIPTIONS: string[] = [
        "Not Started",
        "In Progress",
        "Completed"
    ];
    let workOrdersInAssembly: WorkOrder[] = [];

    workOrdersInAssembly = await GetWorkOrderInAssemblyStage(productionOrderId)

    return (
        <table className="table table-xs rounded-box border border-base-content/5 overflow-auto table-pin-rows">
            <thead>
                <tr>
                    <th>Work Order</th>
                    <th>Description</th>
                    <th>Machine No.</th>
                    <th>Status</th>
                    <th>Completion Date</th>
                </tr>
            </thead>
            <tbody>
                {workOrdersInAssembly.map((d) => (
                    <tr key={d.id}>
                        <td>{d.id}</td>
                        <td>{d.description}</td>
                        <td>{d?.machineId}</td>
                        <td>{STATUS_DESCRIPTIONS[d.status]}</td>
                        <td>{d.completionDate ? new Date(d.completionDate).toUTCString() : ""}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}