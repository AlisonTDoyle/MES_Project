import { ActiveWorkOrders } from "./_components/active-work-orders/active-work-orders";
import { MachineStatusesPieChart } from "./_components/machine-statuses-pie-chart.tsx/machine-statuses-pie-chart";
import { OeeGraph } from "./_components/oee-graph/oee-graph";
import { OutputTargetGraph } from "./_components/output-target-graph/output-target-graph";

export default function FactoryOverview({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[25%_50%_25%] grid-rows-[16%_16%_16%_16%_16%_16%] h-full">
      {/* Column 1 - Far left */}
      <div className="col-1 row-start-1 row-span-2 tile h-fill m-2">
        <OeeGraph></OeeGraph>
      </div>

      <div className="col-1 row-start-3 row-span-2 tile h-fill m-2">
        <MachineStatusesPieChart></MachineStatusesPieChart>
      </div>

      <div className="col-1 row-start-5 row-span-2 tile h-fill m-2">
        <OutputTargetGraph></OutputTargetGraph>
      </div>

      {/* Column 2 - Middle */}
      <div className="col-2 row-start-1 row-span-3 tile h-fill m-2">
        <ActiveWorkOrders></ActiveWorkOrders>
      </div>

      {/* Column 3 - Far right */}
      <div className="col-3 row-start-1 row-span-2 tile h-fill m-2">
      </div>

      <div className="col-3 row-start-3 row-span-2 tile h-fill m-2">
      </div>

      <div className="col-3 row-start-5 row-span-2 tile h-fill m-2">
      </div>
    </div>
  );
}