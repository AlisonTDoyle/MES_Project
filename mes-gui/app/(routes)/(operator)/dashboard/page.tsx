import BreakdownForm from "./_components/record-breakdown/record-breakdown";
import OperatorStationStatusButton from "../_components/operator-station-status-button";
import UpcomingWorkOrders from "./_components/upcoming-work-orders/upcoming-work-orders";
import { MachineEventHistory } from "./_components/machine-event-history/machine-event-history";
import { OperatorOee } from "./_components/operator-oee/operator-oee";
import { CurrentWorkOrder } from "./_components/current-work-order/current-work-order";

export default function Dashboard() {
    return (
        <div className="grid h-screen lg:grid-cols-[33%_33%_33%] lg:grid-rows-[30%_70%] min-h-0">
            <div className="m-2 row-span-2">
                <CurrentWorkOrder />
            </div>

            <div className="m-2 row-span-2">
                <UpcomingWorkOrders />
            </div>

            <div className="m-2">
                <OperatorOee></OperatorOee>
            </div>

            <div className="m-2">
                <MachineEventHistory />
            </div>
        </div>
    )
}