"use client";

import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { GetCurrentMachine, GetIssues, GetOperator, SubmitMachineEvent } from "./record-event-modal-actions";
import { Operator } from "@/app/_interfaces/operator";
import { MachineEvent } from "@/app/_interfaces/machine-breakdown";
import { ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/16/solid";
import { BreakdownType } from "@/app/_interfaces/breakdown-type";

type TimeMode = "now" | "manual";

export function RecordEventModal(props: { props: any[] }) {
  const MAX_NOTE_CHARACTERS: number = 240;

  const [machineId, setMachineId] = useState<number>(1);
  const [reportingOperator, setReportingOperator] = useState<Operator>();
  const [description, setDescription] = useState<string>("");
  const [typeId, setTypeId] = useState<number>(0);
  const [timeMode, setTimeMode] = useState<TimeMode>("now");
  const [manualTime, setManualTime] = useState("");
  const [issueType, setIssueType] = useState<number>(0);
  const [breakdownTypes, setBreakdownTypes] = useState<BreakdownType[]>([]);

  useEffect(() => {
    async function populateFeilds() {
      const session = await fetchAuthSession();
      let cognitoUsername = session.userSub as string;
      let currentOperator = await GetOperator(cognitoUsername);
      let machineId = await GetCurrentMachine(currentOperator.id)

      let types = await GetIssues()

      setReportingOperator(currentOperator);
      setMachineId(machineId);
      setBreakdownTypes(types)
    }

    populateFeilds();
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!typeId) {
      alert("Please select an event type");
      return;
    }

    const payload = {
      machineId: machineId,
      reportingOperatorId:reportingOperator?.cognitoUsername,
      description: description,
      timestamp:
        timeMode === "now"
          ? new Date()
          : new Date(manualTime),
      resolved: false,
      relatedIssue: issueType, // update later if applicable
      eventType: typeId,
    };

    try {
      let success: boolean = await SubmitMachineEvent(payload);

      if (!success) {
        throw new Error("Failed to record machine event");
      }

      // Optional reset
      setMachineId(0);
      setDescription("");
      setTimeMode("now");
      setManualTime("");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="modal-box max-w-md space-y-4">
      <h3 className="font-bold text-lg">Record Machine Event</h3>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <fieldset>
          <legend className="fieldset-legend">Machine ID</legend>
          <input
            className="input w-full"
            type="number"
            value={machineId}
            disabled></input>

        </fieldset>

        {/* Event Type */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Event Type</legend>
          <select
            className="select select-bordered w-full"
            value={typeId}
            onChange={(e) => setTypeId(Number(e.target.value))}
          >
            <option value={0} disabled>
              Select an event type
            </option>
            <option value={1}>
              <span className="badge badge-soft badge-error h-8 w-8 p-0" title="Breakdown"><ExclamationCircleIcon className="h-6 w-6" /></span>  Breakdown
            </option>
            <option value={2}>
              <span className="badge badge-soft badge-warning h-8 w-8 p-0" title="Maintenance"><ExclamationCircleIcon className="h-6 w-6" /></span> Maintenance
            </option>
            <option value={3}>
              <span className="badge badge-soft badge-info h-8 w-8 p-0" title="Fault Notice"><InformationCircleIcon className="h-6 w-6" /></span>Fault Notice
            </option>
          </select>
        </fieldset>

        {/* Issue Type */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Issue Type</legend>
          <select
            className="select select-bordered w-full"
            value={issueType}
            onChange={(e) => setIssueType(Number(e.target.value))}
          >
            <option value={0} disabled>
              Select an issue type
            </option>
            {breakdownTypes.map((type: any) => (
              <option key={type.id} value={type.id}>
                {type.description}
              </option>
            ))}
          </select>
        </fieldset>

        {/* Description */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Description of Issue</legend>
          <textarea
            className="textarea h-24 w-full"
            placeholder="Give as much information as possible about the issue (error codes, steps to reproduce, etc.)"
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
          <span className="label">Characters Remaining: {MAX_NOTE_CHARACTERS - description.length}</span>
        </fieldset>

        {/* Event Time */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Event Time</legend>

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

        <div className="modal-action">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </form>
    </div>
  );
}
