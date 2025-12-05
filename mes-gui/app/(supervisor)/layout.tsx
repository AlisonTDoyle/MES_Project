export default function SupervisorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[20%_80%]">
        <div className="bg-neutral-800 p-8">
            this is the side bar
        </div>
        <div className="p-8">
            {children}
        </div>
    </div>
  );
}