import Clock from "../dashboard/_components/clock"
import OperatorStationStatusButton from "../dashboard/_components/operator-station-status-button"
import { ArrowRightStartOnRectangleIcon, ClockIcon } from '@heroicons/react/24/outline'
import { formatWithOptions } from "util";

export function OperatorSidebar() {
    let companyName = process.env.COMPANY_NAME

    return (
        <div className="bg-base-100 w-80 p-4 shadow-lg h-full flex flex-col">
            <div className="flex flex-col flex-1 min-h-0">
                <div className="mb-4">
                    <h3 className="text-center font-bold">Hello, Alex Turner</h3>
                    <p className="text-center">{companyName}</p>
                </div>

                <ul className="menu border border-base-300 rounded-box w-full">
                    <li><a>Record Breakdown</a></li>
                    <li><a>Record Quality Sample</a></li>
                </ul>
            </div>

            {/* BOTTOM MENU */}
            <div className="mt-auto">
                <div className="divider" />
                <div className="text-center mb-4 text-lg font-bold">
                    <Clock></Clock>
                </div>
                <button className="btn btn-soft btn-primary mb-2 w-full">
                    <ClockIcon className="w-5 h-5"/>
                    <span>Clock into Station</span>
                </button>
                <button className="btn btn-soft btn-error mb-2 w-full">
                    <ArrowRightStartOnRectangleIcon className="w-5 h-5"/>
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    )
}