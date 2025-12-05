import Clock from '@/app/(operator)/dashboard/_components/clock'

let companyName = process.env.COMPANY_NAME

export default function OperatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <div className="bg-neutral-800 px-8 py-2">
            <div className="grid grid-cols-[10%_90%]">
                <div className='content-center'>{companyName}</div>
                <div className='flex justify-end-safe '>
                    <div className="content-center">
                        <span className="mx-4"><span className="font-semibold">Hello</span>, Alex Turner</span>
                        <span className="mx-4"><span className="font-semibold">Current Time:</span> <Clock></Clock></span>
                        <span className="ml-4"><button type="button" className="p-2 rounded border border-red-800 bg-red-900 hover:border-red-500 hover:bg-red-800 hover:cursor-pointer">Sign Out</button></span>
                    </div>
                </div>
            </div>
        </div>
        <div className="p-8">
            {children}
        </div>
    </div>
  );
}