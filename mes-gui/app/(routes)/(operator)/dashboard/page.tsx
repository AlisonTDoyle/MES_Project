import BreakdownForm from "./_components/breakdown-form";
import OperatorStationStatusButton from "./_components/operator-station-status-button";
import UpcomingWorkOrders from "./_components/upcoming-work-orders/upcoming-work-orders";

export default function Dashboard() {
    return(
        <div>
            <OperatorStationStatusButton></OperatorStationStatusButton>
            <UpcomingWorkOrders></UpcomingWorkOrders>
            <BreakdownForm></BreakdownForm>
        </div>
    )
}