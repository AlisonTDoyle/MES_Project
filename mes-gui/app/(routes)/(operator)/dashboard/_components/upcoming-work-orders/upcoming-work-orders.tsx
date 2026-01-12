import { WorkOrder } from "@/app/_interfaces/work-order";

export default async function UpcomingWorkOrders() {
    const response = await fetch("http://localhost:3001/api/operator/1/work-order");
    const parsedRes:{data:[]} = await response.json();
    const workOrders: WorkOrder[] = parsedRes.data;

    return (
        <div>
            <h2>Upcoming Work Orders</h2>
            <ul>
                {workOrders.map((workOrder) => (
                    <li key={workOrder.id}>
                        <div className="dark:bg-neutral-900 rounded p-2 my-1">
                            <p><b className="">{workOrder.description}</b></p>
                            <p><i>{new Date(workOrder.scheduleDate).toLocaleDateString()}</i></p>
                            <button className="btn-secondary p-1 mr-1">Add Note</button> <button className="btn-success p-1">Mark Completed</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}