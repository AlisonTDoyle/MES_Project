"use client"

import { ResponsiveLine } from "@nivo/line"

let data = [
    {
        id: "Target",
        data: [
            { x: "08:00:00", y: 110 },
            { x: "09:00:00", y: 120 },
            { x: "10:00:00", y: 125 },
            { x: "11:00:00", y: 130 },

            { x: "12:00:00", y: 10 },   // lunch break
            { x: "13:00:00", y: 95 },   // ramp-up after lunch

            { x: "14:00:00", y: 120 },
            { x: "15:00:00", y: 125 },
            { x: "16:00:00", y: 115 },
            { x: "17:00:00", y: 120 },
        ]
    },
    {
        id: "Output",
        data: [
            { x: "08:00:00", y: 105 },
            { x: "09:00:00", y: 118 },
            { x: "10:00:00", y: 122 },
            { x: "11:00:00", y: 128 },

            { x: "12:00:00", y: 5 },    // lunch break
            { x: "13:00:00", y: 85 },   // slower restart

            { x: "14:00:00", y: 115 },
            { x: "15:00:00", y: 120 },
            { x: "16:00:00", y: 110 },
            { x: "17:00:00", y: 118 },
        ]
    }
];



export function OutputTargetGraph() {
    return (
        <div className="h-full">
            <h3>Output VS Target</h3>
            <ResponsiveLine
                data={data}
                margin={{ top: 20, right: 20, bottom: 96, left: 20 }}
                colors={{ scheme: 'nivo' }}
                curve="monotoneX"
                yScale={{ type: 'linear', stacked: false, reverse: false }}
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
                ]} 
            />
        </div>
    )
}