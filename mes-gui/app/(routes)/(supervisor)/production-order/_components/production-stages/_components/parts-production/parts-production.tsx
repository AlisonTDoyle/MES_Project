import { WorkOrder } from "@/app/_interfaces/work-order"
import { GetWorkOrderInManufacturingStage } from "./parts-production-actions";

export async function PartsProduction({ productionOrderId }: { productionOrderId: number }) {
    const PARTS_PRODUCTION_STAGE_NO: number[] = [2, 3];
    const STATUS_DESCRIPTIONS: string[] = [
        "Not Started",
        "In Progress",
        "Completed"
    ];
    let workOrdersInPartsProduction: WorkOrder[] = [];

    workOrdersInPartsProduction = await GetWorkOrderInManufacturingStage(productionOrderId, PARTS_PRODUCTION_STAGE_NO)

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
                {workOrdersInPartsProduction.map((d) => (
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