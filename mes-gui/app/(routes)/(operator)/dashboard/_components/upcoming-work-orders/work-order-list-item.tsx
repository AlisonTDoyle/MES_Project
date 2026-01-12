import { WorkOrder } from "@/app/_interfaces/work-order";
import { MarkTaskCompletedButton } from "./mark-task-completed-button";

export function WorkOrderListItem({ workOrder }: { workOrder: WorkOrder }) {
    return (
        <div className="dark:bg-neutral-900 rounded p-2 my-1">
            <p><b className="">{workOrder.description}</b></p>
            <p><i>{new Date(workOrder.scheduleDate).toLocaleDateString()}</i></p>
            <MarkTaskCompletedButton workOrder={workOrder} />
        </div>
    )
}