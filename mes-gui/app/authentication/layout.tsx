import Image from 'next/image'
import type { Metadata } from "next";

let companyName:string|undefined = process.env.COMPANY_NAME

export const metadata: Metadata = {
  title: `Log In - ${companyName}`,
  description: "Log into account to access MES information",
};

export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-2">
        {/* left/column underneath. contains image */}
        <div className="h-screen bg-white col-start-1 row-start-1">
            <picture>
                <source media="(min-width:1024px)" srcSet="factory-beside-water-lg.jpg" />
                <source media="(min-width:768px)" srcSet="factory-beside-water-md.jpg" />
                <img className="w-full h-full object-cover" src="factory-beside-water-sm.jpg" alt="Photo of factory" />
            </picture>
        </div>

        {/* right/top column. contains authentication forms (login, forgot password etc) */}
        <div className="col-start-1 row-start-1 lg:col-start-auto lg:row-start-auto
                        z-10 h-screen p-16 grid place-content-center">
            <div className="bg-neutral-800 p-8 sm:p-16 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center pb-4">
                    <h2 className='text-2xl font-bold'>{companyName}</h2>
                    <h1 className='text-xl'>MES System</h1>
                </div>
                {children}
            </div>

            {/* image attribution */}
            <p className="text-white/60 absolute bottom-0 py-16">
                Image by <a href="https://pixabay.com/users/tho-ge-113537/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=9562428">Thomas G.</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=9562428">Pixabay</a>
            </p>
        </div>
    </div>
  );
}