"use server";

import { BreakdownType } from "@/app/_interfaces/breakdown-type";
import Form from "next/form";
import { SubmitBreakdown } from "./submit-breakdown";

export default async function BreakdownForm() {
    let _breakdownTypes: BreakdownType[] = await FetchBreakdownTypes();
    let _breakdownHintText: string = "Give as much information as possible about the breakdown such as error codes or steps to reproduce";

    async function FetchBreakdownTypes(): Promise<BreakdownType[]> {
        let response = await fetch("http://localhost:3000/api/breakdown/type", { method: "GET" });
        const data = await response.json();

        if (data.result) {
            return data.result;
        } else {
            return [];
        }
    }

    return (
        <div>
            <h1>Record Breakdown</h1>
            <Form action={SubmitBreakdown}>
                <div className="input-container">
                    <label htmlFor="">Machine</label><br />
                    <input type="text" className="input" name="machineId" id="machineId" />
                </div>
                <div className="input-container">
                    <label htmlFor="">Description</label><br />
                    <textarea className="input" name="description" id="description" placeholder={_breakdownHintText}></textarea>
                </div>
                <div className="input-container">
                    <label htmlFor="">Type</label><br />
                    <select className="input input-select" name="breakdownTypeId" id="breakdownTypeId">
                        {
                            _breakdownTypes.map((type: BreakdownType) => (
                                <option key={type.id} value={type.id}>{type.description}</option>
                            ))
                        }
                    </select>
                </div>
                <button className="btn-primary my-2" type="submit">Submit Breakdown</button>
            </Form>
        </div>
    )
}