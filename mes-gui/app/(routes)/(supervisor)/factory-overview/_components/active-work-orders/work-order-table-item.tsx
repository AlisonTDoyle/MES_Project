import { WorkOrder } from "@/app/_interfaces/work-order";

export function WorkOrderTableItem({workOrder}:{workOrder:WorkOrder}) {
    let status:string = workOrder.completed?"Completed":"Incomplete";
    let badge:string = workOrder.completed?"badge-success":"badge-danger";

    return (
        <tr key={workOrder.id} className="p-1 hover:cursor-pointer">
            <td>{workOrder.id}</td>
            <td>1234567890</td>
            <td><span className={badge}>{status}</span></td>
            <td>{workOrder.description}</td>
            <td>{new Date(workOrder.scheduleDate).toLocaleDateString()}</td>
        </tr>
    )
}