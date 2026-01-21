"use client";

import { useState } from "react";

type TimeMode = "now" | "manual";

export function RecordEventModal(props: { props: any[] }) {
  const breakdownTypes = props.props;

  const [form, setForm] = useState({
    machineId: 1,
    reportingOperatorId: 1,
    description: "",
    typeId: 0,
  });

  const [timeMode, setTimeMode] = useState<TimeMode>("now");
  const [manualTime, setManualTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.typeId) {
      alert("Please select an event type");
      return;
    }

    const payload = {
      machineId: form.machineId,
      reportingOperatorId: 1,
      description: form.description,
      timestamp:
        timeMode === "now"
          ? new Date().toISOString()
          : new Date(manualTime).toISOString(),
      resolved: false,
      relatedIssue: form.typeId, // update later if applicable
      eventType: 1,
    };

    try {
      const response = await fetch("http://localhost:3001/api/machine-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to record machine event");
      }

      const savedEvent = await response.json();

      // Optional reset
      setForm({
        machineId: 1,
        reportingOperatorId: 1,
        description: "",
        typeId: 0,
      });
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
            value={form.machineId}
            onChange={(e) =>
              setForm({ ...form, machineId: Number.parseInt(e.target.value) })
            }></input>

        </fieldset>

        {/* Description */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Description of Issue</legend>
          <textarea
            className="textarea h-24 w-full"
            placeholder="Give as much information as possible about the issue (error codes, steps to reproduce, etc.)"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </fieldset>

        {/* Event Type */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Event Type</legend>
          <select
            className="select select-bordered w-full"
            value={form.typeId}
            onChange={(e) => {
              setForm({ ...form, typeId: Number(e.target.value) })
              console.log(e.target.value)
            }
            }
          >
            <option value={0} disabled>
              Select an event type
            </option>
            {breakdownTypes.map((type: any) => (
              <option key={type.id} value={type.id}>
                {type.description}
              </option>
            ))}
          </select>
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
