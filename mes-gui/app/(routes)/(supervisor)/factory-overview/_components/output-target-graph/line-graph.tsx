"use client"

import { ResponsiveLine } from "@nivo/line"
import { useMemo } from "react"

export function LineGraph() {
    const data = useMemo(() => {
        return [
            {
                id: "Target",
                data: [
                    { x: "08:00:00", y: 110 },
                    { x: "09:00:00", y: 120 },
                    { x: "10:00:00", y: 125 },
                    { x: "11:00:00", y: 130 },

                    { x: "12:00:00", y: 10 },
                    { x: "13:00:00", y: 95 },

                    { x: "14:00:00", y: 120 },
                    { x: "15:00:00", y: 125 },
                    { x: "16:00:00", y: 115 },
                    { x: "17:00:00", y: 120 },
                ],
            },
            {
                id: "Output",
                data: [
                    "08:00:00",
                    "09:00:00",
                    "10:00:00",
                    "11:00:00",
                    "12:00:00",
                    "13:00:00",
                    "14:00:00",
                    "15:00:00",
                    "16:00:00",
                    "17:00:00",
                ].map(time => ({
                    x: time,
                    // random output value (0–130)
                    y: Math.floor(Math.random() * 131),
                })),
            },
        ]
    }, [])

    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 20, right: 20, bottom: 96, left: 20 }}
            colors={{ scheme: "nivo" }}
            curve="monotoneX"
            yScale={{ type: "linear", stacked: false, reverse: false }}
            legends={[
                {
                    anchor: "bottom",
                    direction: "row",
                    itemHeight: 18,
                    itemWidth: 100,
                    itemTextColor: "#999",
                    symbolShape: "circle",
                    symbolSize: 18,
                    toggleSerie: true,
                    translateY: 56,
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemTextColor: "#000",
                            },
                        },
                    ],
                },
            ]}
        />
    )
}
