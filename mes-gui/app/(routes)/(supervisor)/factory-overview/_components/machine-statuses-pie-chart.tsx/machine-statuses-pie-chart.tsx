"use client"
import { ResponsivePie } from "@nivo/pie"

let machineData = [{
    "id": "Running",
    "label": "Running",
    "value": 32,
    "color": "hsl(159.74 100% 37%)"
},
{
    "id": "Offline",
    "label": "Offline",
    "value": 5,
    "color": "hsl(215.38 18% 47%)"
},
{
    "id": "Broken Down",
    "label": "Broken Down",
    "value": 13,
    "color": "hsl(356.95 96% 57.99999999999999%)"
}];

export function MachineStatusesPieChart() {
    return (
        <div className="tile h-full">
            <h3>Machine Statuses Pie Charts</h3>
            <ResponsivePie data={machineData}
                colors={{ datum: 'data.color' }}
                cornerRadius={8}
                padAngle={4}
                arcLinkLabelsTextColor={{ from: 'color', modifiers: [] }}
                margin={{ top: 0, right: 72, bottom: 48, left: 72 }}
                arcLinkLabelsDiagonalLength={0} />
        </div>
    )
}