"use client"
import { ResponsivePie } from "@nivo/pie"

let machineData = [{
    "id": "Parts Production",
    "label": "Parts Production",
    "value": 32,
    "color": "oklch(82% 0.111 230.318)"
},
{
    "id": "Quality Control",
    "label": "Quality Control",
    "value": 5,
    "color": "oklch(77% 0.152 181.912)"
},
{
    "id": "Assembly",
    "label": "Assembly",
    "value": 13,
    "color": "oklch(76% 0.188 70.08)"
},
{
    "id": "Completed",
    "label": "Completed",
    "value": 13,
    "color": "hsl(356.95 96% 57.99999999999999%)"
}];

export function StatusPieChart() {
    return(
        <ResponsivePie data={machineData}
                colors={{ datum: 'data.color' }}
                cornerRadius={6}
                padAngle={4}
                enableArcLinkLabels={false}
                margin={{ top: 0, right: 0, bottom: 100, left: 0 }}
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
    )
}