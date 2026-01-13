import { ActiveWorkOrders } from "./_components/active-work-orders/active-work-orders";

export default function FactoryOverview({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <ActiveWorkOrders></ActiveWorkOrders>
    </div>
  );
}