"use client";

import { RecordEventModal } from "./record-event-modal/record-event-modal";

export function SidebarRecorderButtons({ props }: { props: any[] }) {
    return (
        <div>
            <ul className="menu border border-base-300 rounded-box w-full">
                <li><a onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement)?.showModal()}>Record Event</a></li>
                <li><a>Record Quality Sample</a></li>
            </ul>

            <dialog id="my_modal_1" className="modal">
                <RecordEventModal props={props}></RecordEventModal>
            </dialog>
        </div>
    )
}