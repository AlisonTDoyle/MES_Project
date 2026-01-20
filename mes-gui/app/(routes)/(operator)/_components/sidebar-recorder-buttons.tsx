"use client";

import { RecordEventModal } from "./record-event-modal/record-event-modal";
import { RecordQualitySampleModal } from "./record-quality-sample-modal/record-quality-sample-modal";

export function SidebarRecorderButtons({ props }: { props: any[] }) {
    return (
        <div>
            <ul className="menu border border-base-300 rounded-box w-full">
                <li><a onClick={() => (document.getElementById('record-event-modal') as HTMLDialogElement)?.showModal()}>Record Event</a></li>
                <li><a onClick={() => (document.getElementById('record-quality-sample-modal') as HTMLDialogElement)?.showModal()}>Record Quality Sample</a></li>
            </ul>

            <dialog id="record-event-modal" className="modal">
                <RecordEventModal props={props}></RecordEventModal>
            </dialog>

            <dialog id="record-quality-sample-modal" className="modal">
                <RecordQualitySampleModal></RecordQualitySampleModal>
            </dialog>
        </div>
    )
}