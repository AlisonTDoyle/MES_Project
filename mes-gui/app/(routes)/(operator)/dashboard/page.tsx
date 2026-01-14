import BreakdownForm from "./_components/record-breakdown/record-breakdown";
import OperatorStationStatusButton from "./_components/operator-station-status-button";
import UpcomingWorkOrders from "./_components/upcoming-work-orders/upcoming-work-orders";
import { MachineEventHistory } from "./_components/machine-event-history/machine-event-history";

export default function Dashboard() {
    return(
        <div>
            <UpcomingWorkOrders></UpcomingWorkOrders>
            <BreakdownForm></BreakdownForm>
            <MachineEventHistory></MachineEventHistory>
        </div>
    )
}