export default function SupervisorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[20%_80%] h-100">
        {/* sidebar */}
        <div className="bg-neutral-500/20 p-4">
            <h1 className="section-header">Search</h1>
            {/* search feilds */}
            <div className="w-80 grid grid-cols-[40%_60%] my-2">
                <select className="rounded-l border border-neutral-700 bg-neutral-900 p-2">
                    <option>Orders</option>
                    <option>Machines</option>
                </select>
                <input className="rounded-r border border-neutral-700 bg-neutral-900 p-2" type="text"></input>
            </div>

            <button type="button" className="rounded bg-sky-600 p-2">Search</button>
        </div>
        {/* main body */}
        <div className="p-4">
            <h1>test</h1>
            {children}
        </div>
    </div>
  );
}