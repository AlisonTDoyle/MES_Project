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
        <div className="h-64">
            <h3>Machine Statuses</h3>
            <ResponsivePie data={machineData}
                colors={{ datum: 'data.color' }}
                cornerRadius={6}
                padAngle={4}
                enableArcLinkLabels={false}
                margin={{ top: 0, right: 72, bottom: 100, left: 72 }}
                arcLinkLabelsDiagonalLength={0}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ],
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemWidth: 100,
                        symbolShape: 'circle',
                        symbolSize: 18,
                        toggleSerie: true,
                        translateY: 56
                    }
                ]} />
        </div>
    )
}