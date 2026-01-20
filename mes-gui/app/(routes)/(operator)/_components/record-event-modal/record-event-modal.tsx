"use client";

import { useState } from "react";

type TimeMode = "now" | "manual";

export function RecordEventModal(props: { props: any[] }) {
  const breakdownTypes = props.props;

  const [form, setForm] = useState({
    machineId: 0,
    reportingOperatorId: 1,
    description: "",
    typeId: 0,
  });

  const [timeMode, setTimeMode] = useState<TimeMode>("now");
  const [manualTime, setManualTime] = useState("");

  const handleSubmit = () => {
    const payload = {
      ...form,
      timestamp:
        timeMode === "now" ? new Date().toISOString() : manualTime,
    };

    console.log("Machine Event:", payload);
  };

  return (
    <div className="modal-box max-w-md space-y-4">
      <h3 className="font-bold text-lg">Record Machine Event</h3>

      <form className="space-y-4">
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
            onChange={(e) =>
              setForm({ ...form, typeId: Number(e.target.value) })
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
      </form>

      <div className="modal-action">
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <form method="dialog">
          <button className="btn">Close</button>
        </form>
      </div>
    </div>
  );
}
