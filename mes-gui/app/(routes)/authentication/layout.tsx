import Image from 'next/image'
import type { Metadata } from "next";

let companyName: string | undefined = process.env.COMPANY_NAME

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
    <div className="relative grid grid-cols-1 lg:grid-cols-2 bg-base-200">
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
        <div className="card shadow-sm bg-base-100 sm:p-16 flex flex-col items-center justify-center">
          <div className="card-body">
            <div className="flex flex-col items-center justify-center pb-4">
              <span className="card-title">{companyName}</span>
              <h1 className='text-xl'>MES System</h1>
            </div>
            <div className="flex flex-col items-center justify-center pb-4 w-full">
              <div className="w-full max-w-sm">
                {children}
              </div>
            </div>
          </div>
        </div>

        {/* image attribution */}
        <p className="absolute bottom-0 right-0 m-8">
          Image by <a href="https://pixabay.com/users/tho-ge-113537/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=9562428">Thomas G.</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=9562428">Pixabay</a>
        </p>
      </div>
    </div>
  );
}