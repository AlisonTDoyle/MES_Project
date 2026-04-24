"use client";

import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { GetCurrentMachine, GetCurrentWorkOrderInformation, GetOperator, SubmitNewSampleOrder } from "./record-quality-sample-modal-actions";
import { Operator } from "@/app/_interfaces/operator";
import { QualitySample } from "@/app/_interfaces/quality-sample";

export function RecordQualitySampleModal() {
    type TimeMode = "now" | "manual";
    type Result = "pass" | "fail";

    const MAX_NOTE_CHARACTERS:number = 240;
    const MAX_SAMPLE_QUANTITY:number = 255;

    const [workOrder, setWorkOrder] = useState("");
    const [productionOrderId, setProductionOrderId] = useState("");
    const [machineId, setMachineId] = useState<number>(0);
    const [timeMode, setTimeMode] = useState<TimeMode>("now");
    const [manualTime, setManualTime] = useState("");
    const [result, setResult] = useState<Result | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [operator, setOperator] = useState<Operator>();
    const [notes, setNotes] = useState("");
    const [quantityUnit, setQuantityUnit] = useState("pcs");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!result) {
            alert("Please select a result");
            return;
        }

        // Example numeric mapping for result
        const resultValue =
            result === "pass" ? 1 : result === "fail" ? 0 : -1;

        const newQualitySample:QualitySample = {
            workOrderId: workOrder,
            productOrderId: productionOrderId,
            timestamp:
                timeMode === "now"
                    ? new Date().toISOString()
                    : new Date(manualTime).toISOString(),
            result: resultValue,
            sampleQuantity: quantity,
            sampleUnit: quantityUnit,
            operatorId: operator?.cognitoUsername as string,
            machineId: machineId,
            notes:notes,
        };

        try {
            let publishSuccess:boolean = await SubmitNewSampleOrder(newQualitySample);

            if (!publishSuccess) {
                throw new Error("Failed to save quality sample");
            }

            // Optional: reset form
            setWorkOrder("");
            setProductionOrderId("");
            setResult(null);
            setQuantity(1);
            setQuantityUnit("pcs");
            setNotes("");
            setMachineId(0)
            setManualTime("");
            setTimeMode("now");
        } catch (err: any) {
            console.error(err);
            alert(err.message);
        }
    };

    useEffect(() => {
        async function populateDefaultFeilds() {
            const session = await fetchAuthSession();
            let cognitoUsername = session.userSub as string;
            let currentOperator = await GetOperator(cognitoUsername);

            let machineId = await GetCurrentMachine(currentOperator.id);
            let workOrder = await GetCurrentWorkOrderInformation(machineId);

            setOperator(currentOperator);
            setMachineId(machineId)
            setWorkOrder(String(workOrder?.id))
            setProductionOrderId(String(workOrder?.productionOrderId))
        }

        populateDefaultFeilds();
    }, []);

    return (
        <div className="modal-box">
            <h2 className="text-lg font-semibold">Quality Sample Entry</h2>
            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Production Order</legend>
                    <input
                        className="input input-bordered w-full"
                        value={productionOrderId}
                        onChange={(e) => setProductionOrderId(e.target.value)}
                        placeholder="ITEM-001"
                        disabled
                    />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Work Order</legend>
                    <input
                        className="input input-bordered w-full"
                        value={workOrder}
                        onChange={(e) => setWorkOrder(e.target.value)}
                        placeholder="WO-12345"
                        disabled
                    />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Machine ID</legend>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        value={machineId}
                        onChange={(e) => setMachineId(Number(e.target.value))}
                        placeholder="MA-12345"
                        disabled
                    />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Sample Time</legend>

                    <div className="flex gap-4 mb-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                className="radio radio-primary"
                                checked={timeMode === "now"}
                                onChange={() => setTimeMode("now")}
                            />
                            <span>Use current time</span>
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                className="radio radio-primary"
                                checked={timeMode === "manual"}
                                onChange={() => setTimeMode("manual")}
                            />
                            <span>Enter manually</span>
                        </label>
                    </div>

                    {timeMode === "manual" && (
                        <input
                            type="datetime-local"
                            className="input input-bordered w-full"
                            value={manualTime}
                            onChange={(e) => setManualTime(e.target.value)}
                        />
                    )}
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Result</legend>

                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                className="radio radio-success"
                                checked={result === "pass"}
                                onChange={() => setResult("pass")}
                            />
                            <span>Pass</span>
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                className="radio radio-error"
                                checked={result === "fail"}
                                onChange={() => setResult("fail")}
                            />
                            <span>Fail</span>
                        </label>
                    </div>
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Sample Quantity</legend>

                    <div className="flex gap-2">
                        <input
                            type="number"
                            min={1}
                            max={MAX_SAMPLE_QUANTITY}
                            className="input input-bordered w-full"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />

                        <select
                            className="select select-bordered w-32"
                            value={quantityUnit}
                            onChange={(e) => setQuantityUnit(e.target.value)}
                        >
                            <option value="pcs">pcs</option>
                            <option value="kg">kg</option>
                            <option value="g">g</option>
                            <option value="m">m</option>
                        </select>
                    </div>
                </fieldset>


                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Operator</legend>
                    <input
                        className="input input-bordered w-full"
                        value={(operator?.firstName)?.trim() + " " + (operator?.lastName)?.trim()}
                        placeholder="Initials or ID"
                        disabled
                    />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Notes</legend>
                    <textarea
                        className="textarea textarea-bordered h-24 w-full"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Optional comments"
                        maxLength={MAX_NOTE_CHARACTERS}
                    />
                    <span className="label">Characters Remaining: {MAX_NOTE_CHARACTERS - notes.length}</span>
                </fieldset>

                <button type="submit" className="btn btn-primary btn-block">
                    Save Sample
                </button>
            </form>
            <div className="mt-4">
                <form method="dialog">
                    <button className="btn btn-soft btn-primary w-full">Close</button>
                </form>
            </div>
        </div>
    );
}