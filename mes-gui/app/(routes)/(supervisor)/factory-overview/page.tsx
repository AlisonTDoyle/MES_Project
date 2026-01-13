import { ActiveWorkOrders } from "./_components/active-work-orders/active-work-orders";
import { MachineStatusesPieChart } from "./_components/machine-statuses-pie-chart.tsx/machine-statuses-pie-chart";
import { OeeGraph } from "./_components/oee-graph/oee-graph";

export default function FactoryOverview({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[25%_50%_25%] grid-flow-row auto-rows-max">
      {/* Column 1 - Far left */}
      <div>
        <OeeGraph></OeeGraph>
        <MachineStatusesPieChart></MachineStatusesPieChart>
      </div>
      {/* Column 2 - Middle */}
      <div className="mx-4">
        <ActiveWorkOrders></ActiveWorkOrders>
      </div>
      {/* Column 3 - Far right */}
      <div>
      </div>
    </div>
  );
}