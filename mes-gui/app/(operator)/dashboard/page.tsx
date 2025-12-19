import BreakdownForm from "./_components/breakdown-form";
import OperatorStationStatusButton from "./_components/operator-station-status-button";
import UpcomingWorkOrders from "./_components/Upcoming-Work-Orders";

export default function Dashboard() {
    return(
        <div>
            <OperatorStationStatusButton></OperatorStationStatusButton>
            <UpcomingWorkOrders></UpcomingWorkOrders>
            <BreakdownForm></BreakdownForm>
        </div>
    )
}