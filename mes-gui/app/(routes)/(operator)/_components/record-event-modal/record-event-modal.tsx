"use client";

import { useEffect, useState } from "react";

export function RecordEventModal(props: { props: any[] }) {
    const apiUrl = "http://localhost:3001/api";

    const [breakdownForm, setBreakdownForm] = useState({
        machineId: 0,
        reportingOperatorId: 1,
        description: "",
        type: 0,
    });

    let breakdownTypes = props.props;

    return (
        <div className="modal-box">
            <h3 className="font-bold text-lg">Record Machine Event</h3>
            <form action="">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Description of Issue</legend>
                    <textarea className="textarea h-24 w-full" placeholder="Give as much information as possible about the breakdown such as error codes or steps to reproduce"></textarea>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Browsers</legend>
                    <select defaultValue="Pick a browser" className="select w-full">
                        <option disabled={true}>Pick an event type</option>
                        {
                            breakdownTypes.map((type: any) => (
                                <option key={type.id} value={type.id}>{type.description}</option>
                            ))
                        }
                    </select>
                </fieldset>
            </form>
            <div className="modal-action">
                <form method="dialog">
                    <button className="btn btn-primary mx-2">Submit</button>
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                </form>
            </div>
        </div>
    )
}