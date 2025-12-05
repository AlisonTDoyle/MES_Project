export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[20-80]">
        <div className="bg-neutral-800">
            this is the side bar
        </div>
        <div>
            {children}
        </div>
    </div>
  );
}