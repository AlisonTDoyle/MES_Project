import { ActiveWorkOrders } from "./_components/active-work-orders/active-work-orders";
import { MachineAlerts } from "./_components/machine-alerts/machine-alerts";
import { MachineStatusesPieChart } from "./_components/machine-statuses-pie-chart.tsx/machine-statuses-pie-chart";
import { OeeGraph } from "./_components/oee-graph/oee-graph";
import { OutputTargetGraph } from "./_components/output-target-graph/output-target-graph";

export default function FactoryOverview({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid 
                    grid-cols-1 
                    lg:grid-cols-2
                    xl:grid-cols-[25%_37.5%_37.5%] 
                    xl:grid-rows-[16.6%_16.6%_16.6%_16.6%_16.6%_16.6%] 
                    h-full">
      {/* Column 1 - Far left */}
      <div className="h-fill m-2 lg:col-1 xl:row-start-1 xl:row-span-2">
        <OeeGraph></OeeGraph>
      </div>

      <div className=" h-fill m-2 xl:col-1 xl:row-start-3 xl:row-span-2">
        <MachineStatusesPieChart></MachineStatusesPieChart>
      </div>

      <div className=" h-fill m-2 xl:col-1 xl:row-start-5 xl:row-span-2">
      </div>

      {/* Column 2 - Middle */}
      <div className=" h-fill m-2 xl:col-2 xl:row-start-1 xl:row-span-3">
        <ActiveWorkOrders></ActiveWorkOrders>
      </div>

      <div className=" h-fill m-2 xl:col-2 xl:row-start-4 xl:row-span-3">
        <MachineAlerts></MachineAlerts>
      </div>

      {/* Column 3 - Far right */}
      <div className=" h-fill m-2 lg:col-3 lg:row-start-1 xl:row-span-3">
        <OutputTargetGraph></OutputTargetGraph>
      </div>

      <div className=" h-fill m-2 lg:col-3 lg:row-start-4 lg:row-span-3">
      </div>
    </div>
  );
}