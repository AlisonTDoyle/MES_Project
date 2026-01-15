import Clock from "../dashboard/_components/clock"
import OperatorStationStatusButton from "../dashboard/_components/operator-station-status-button"
import {ArrowRightStartOnRectangleIcon} from '@heroicons/react/24/solid'
import { formatWithOptions } from "util";

export function OperatorSidebar() {
    let companyName = process.env.COMPANY_NAME

    return (
        <div>
            <div>{companyName}</div>
            <p><span><span className="font-semibold">Hello</span>, Alex Turner</span></p>
            <p><span><span className="font-semibold">Current Time:</span> <Clock></Clock></span></p>

            <hr className="my-2"/>

            <button className="btn-danger w-full mb-2 px-8">
                <div className="grid grid-cols-[10%_90%]">
                    <ArrowRightStartOnRectangleIcon/>
                    <span>Sign Out</span>
                </div>
            </button>
            <OperatorStationStatusButton></OperatorStationStatusButton>
        </div>
    )
}