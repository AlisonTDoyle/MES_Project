import BreakdownForm from "./_components/record-breakdown/record-breakdown";
import OperatorStationStatusButton from "./_components/operator-station-status-button";
import UpcomingWorkOrders from "./_components/upcoming-work-orders/upcoming-work-orders";
import { MachineEventHistory } from "./_components/machine-event-history/machine-event-history";

export default function Dashboard() {
    return (
        <div className="grid grid-cols-[33%_33%_33%] grid-rows-2 h-full min-h-0">
            <div className="tile m-2">
                <UpcomingWorkOrders />
            </div>

            <div className="tile m-2">
                <BreakdownForm />
            </div>

            <div className="tile m-2 row-span-2 overflow-hidden">
                <MachineEventHistory />
            </div>
        </div>
    )
}