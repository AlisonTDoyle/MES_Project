import { WorkOrder } from "@/app/_interfaces/work-order";
import { MarkTaskCompletedButton } from "./mark-task-completed-button";

export function WorkOrderListItem({ workOrder }: { workOrder: WorkOrder }) {
    return (
        <div className="list-row">
            <div>
                <p><b className="">{workOrder.description}</b></p>
                <p className="text-xs font-semibold opacity-60">{new Date(workOrder.scheduleDate).toLocaleDateString()}</p>
                <MarkTaskCompletedButton workOrder={workOrder} />
            </div>
        </div>
    )
}