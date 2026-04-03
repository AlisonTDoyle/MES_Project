"use client";

import { BreakdownType } from "@/app/_interfaces/breakdown-type";
import { FormEvent, useState } from "react";

export default function BreakdownForm({ breakdownTypes }: { breakdownTypes: BreakdownType[] }) {
    let _breakdownHintText: string = "Give as much information as possible about the breakdown such as error codes or steps to reproduce";
    let _apiUrl = "http://localhost:3001/api";
    let [breakdownForm, setBreakdownForm] = useState({
        machineId: 0,
        reportingOperatorId: 1,
        description: '',
        type: 0
    })

    function updateFormValues (e:any) {
        let { name, value } = e.target;
        setBreakdownForm({...breakdownForm, [name]:value});
    }

    function submitForm (event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        console.log(formData.values)

        let body = {
            "machineId": breakdownForm.machineId,
            "reportingOperatorId": 1,
            "description": breakdownForm.description,
            "type": breakdownForm.type
        }

        let res = fetch(`${_apiUrl}/breakdown`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
    }

    return (
        <form method="post" onSubmit={submitForm}>
            <div className="input-container">
                <label htmlFor="machineId">Machine</label><br />
                <input type="text" className="input" name="machineId" id="machineId" value={breakdownForm.machineId} onChange={updateFormValues}/>
            </div>
            <div className="input-container">
                <label htmlFor="description">Description</label><br />
                <textarea className="input" name="description" id="description" placeholder={_breakdownHintText} value={breakdownForm.description} onChange={updateFormValues}></textarea>
            </div>
            <div className="input-container">
                <label htmlFor="breakdownTypeId">Type</label><br />
                <select className="input input-select" name="type" id="type" value={breakdownForm.type} onChange={updateFormValues}>
                    {
                        breakdownTypes.map((type: BreakdownType) => (
                            <option key={type.id} value={type.id}>{type.description}</option>
                        ))
                    }
                </select>
            </div>
            <button className="btn-primary my-2" type="submit">Submit Breakdown</button>
        </form>
    )
}