import { randomInt } from "crypto";
import Clock from "../dashboard/_components/clock"
import OperatorStationStatusButton from "../dashboard/_components/operator-station-status-button"
import { ArrowRightStartOnRectangleIcon, ClockIcon } from '@heroicons/react/24/outline'
import { formatWithOptions } from "util";
import { RecordEventModal } from "./record-event-modal/record-event-modal";
import { Sidebar } from "../../(supervisor)/_components/sidebar";
import { SidebarRecorderButtons } from "./sidebar-recorder-buttons";

export async function OperatorSidebar() {
    let companyName = process.env.COMPANY_NAME
    let statusCode: number = randomInt(3);
    let status: string = "";
    let badge: string = "badge badge-soft";
    let machineEventTypes = await fetch("http://localhost:3001/api/machine-event/type").then(res => res.json()).then(data => data.data);

    switch (statusCode) {
        case 0:
            status = "Not Running";
            badge += " badge-error";
            break;
        case 1:
            status = "Paused";
            badge += " badge-warning";
            break;
        case 2:
            status = "Running";
            badge += " badge-success";
            break;
    }

    return (
        <div className="bg-base-100 w-80 p-4 shadow-lg h-full flex flex-col">
            <div className="flex flex-col flex-1 min-h-0">
                <div className="mb-4">
                    <h3 className="text-center font-bold">Hello, Alex Turner</h3>
                    <p className="text-center">{companyName}</p>
                </div>

                <div className="mb-4">
                    <b>Machine Status: </b>
                    <span className={badge}>{status}</span>
                </div>

                <SidebarRecorderButtons props={machineEventTypes}></SidebarRecorderButtons>
            </div>

            {/* BOTTOM MENU */}
            <div className="mt-auto">
                <div className="divider" />
                <div className="text-center mb-4 text-lg font-bold">
                    <Clock></Clock>
                </div>
                <button className="btn btn-soft btn-primary mb-2 w-full">
                    <ClockIcon className="w-5 h-5" />
                    <span>Clock into Station</span>
                </button>
                <button className="btn btn-soft btn-error mb-2 w-full">
                    <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>


    )
}