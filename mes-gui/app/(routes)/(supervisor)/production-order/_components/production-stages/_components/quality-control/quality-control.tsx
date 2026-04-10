"use client"

import { useEffect, useState } from "react";
import { GetQualitySamples } from "./quality-control-actions";
import { QualitySample } from "@/app/_interfaces/quality-sample";

export function QualityControl({ productionOrderId }: { productionOrderId: number }) {
    const [qualitySamples, setQualitySamples] = useState<QualitySample[]>([]);
    const [selectedQualitySample, setSelectedQualitySample] = useState<QualitySample | null>(null);

    // fetch all samples
    useEffect(() => {
        async function getQualitySamples() {
            let qs = await GetQualitySamples(productionOrderId);
            setQualitySamples(qs);
        }

        getQualitySamples();
    }, [])


    return (
        <div className="h-full grid lg:grid-cols-2 gap-2">
            <table className="table table-xs table-pin-rows table-pin-cols rounded-box border border-base-content/5 overflow-auto table-pin-rows">
                <thead>
                    <tr>
                        <th>Work Order</th>
                        <th>Machine No.</th>
                        <th>Operator</th>
                        <th>Timestamp</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {qualitySamples.map(qs => (
                        <tr key={qs.id} className="p-1 hover:cursor-pointer hover:bg-base-200" onClick={() => { setSelectedQualitySample(qs) }}>
                            <td>{qs.workOrderId}</td>
                            <td>{qs.machineId}</td>
                            <td>{qs.operatorFirstName} {qs.opertatorLastName}</td>
                            <td>{new Date(qs.timestamp).toUTCString()}</td>
                            <td className={`badge badge-soft ${qs.result == 1 ? 'badge-success' : 'badge-error'}`}>{
                                qs.result == 1 ? <span>Pass</span> : <span>Fail</span>
                            }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="rounded-box border border-base-content/5 p-4 h-full">{
                selectedQualitySample != null ?
                    <div>
                        <table className="table">
                            <tr>
                                <td className="w-32"><b>Work Order:</b></td>
                                <td>{selectedQualitySample.workOrderId}</td>
                            </tr>
                            <tr>
                                <td><b>Machine:</b></td>
                                <td>{selectedQualitySample.machineId}</td>
                            </tr>
                            <tr>
                                <td><b>Operator:</b></td>
                                <td>{selectedQualitySample.operatorFirstName} {selectedQualitySample.opertatorLastName}</td>
                            </tr>
                            <tr>
                                <td><b>Timestamp:</b></td>
                                <td>{new Date(selectedQualitySample.timestamp).toUTCString()}</td>
                            </tr>
                            <tr>
                                <td><b>Quantity:</b></td>
                                <td>{selectedQualitySample.sampleQuantity} {selectedQualitySample.sampleUnit}</td>
                            </tr>
                            <tr>
                                <td><b>Notes:</b></td>
                                <td>{selectedQualitySample.notes}</td>
                            </tr>
                        </table>
                    </div> :
                    <div className="hero">
                        <div className="hero-content text-center">
                            No quality samples selected
                        </div>
                    </div>
            }</div>
        </div>
    )
}