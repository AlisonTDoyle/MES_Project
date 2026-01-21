"use client";

import { useState } from "react";

export function RecordQualitySampleModal() {
    type TimeMode = "now" | "manual";
    type Result = "pass" | "fail" | "pending";

    const [workOrder, setWorkOrder] = useState("");
    const [itemId, setItemId] = useState("");
    const [timeMode, setTimeMode] = useState<TimeMode>("now");
    const [manualTime, setManualTime] = useState("");
    const [result, setResult] = useState<Result | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [operator, setOperator] = useState("");
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

        const payload = {
            workOrderId: workOrder,
            itemId,
            sampleTime:
                timeMode === "now"
                    ? new Date().toISOString()
                    : new Date(manualTime).toISOString(),
            result: resultValue,
            sampleQuantity: quantity,
            sampleUnit: quantityUnit,
            operatorId: operator,
            notes,
        };

        try {
            const response = await fetch(
                "http://localhost:3001/api/quality-sample",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to save quality sample");
            }

            const savedSample = await response.json();
            console.log("Saved Quality Sample:", savedSample);

            // Optional: reset form
            setWorkOrder("");
            setItemId("");
            setResult(null);
            setQuantity(1);
            setQuantityUnit("pcs");
            setOperator("");
            setNotes("");
            setManualTime("");
            setTimeMode("now");
        } catch (err: any) {
            console.error(err);
            alert(err.message);
        }
    };

    return (
        <div className="modal-box">
            <h2 className="text-lg font-semibold">Quality Sample Entry</h2>
            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Work Order</legend>
                    <input
                        className="input input-bordered w-full"
                        value={workOrder}
                        onChange={(e) => setWorkOrder(e.target.value)}
                        placeholder="WO-12345"
                    />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Item ID</legend>
                    <input
                        className="input input-bordered w-full"
                        value={itemId}
                        onChange={(e) => setItemId(e.target.value)}
                        placeholder="ITEM-001"
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

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                className="radio radio-warning"
                                checked={result === "pending"}
                                onChange={() => setResult("pending")}
                            />
                            <span>Hold</span>
                        </label>
                    </div>
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Sample Quantity</legend>

                    <div className="flex gap-2">
                        <input
                            type="number"
                            min={1}
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
                        value={operator}
                        onChange={(e) => setOperator(e.target.value)}
                        placeholder="Initials or ID"
                    />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Notes</legend>
                    <textarea
                        className="textarea textarea-bordered h-24 w-full"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Optional comments"
                    />
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