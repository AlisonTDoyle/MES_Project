"use client"
import { ResponsivePie } from "@nivo/pie"
import { useMemo } from "react"

export function StatusPieChart() {
    const machineData = useMemo(() => {
        const total = 100

        // Running gets 50–80%
        const running = Math.floor(Math.random() * 31) + 50

        // Remaining percentage
        const remaining = total - running

        // Split remaining between Offline & Broken Down
        const offline = Math.floor(Math.random() * (remaining - 1)) + 1
        const brokenDown = remaining - offline

        return [
            {
                id: "Running",
                label: "Running",
                value: running,
                color: "oklch(76% 0.177 163.223)",
            },
            {
                id: "Offline",
                label: "Offline",
                value: offline,
                color: "oklch(70% 0.015 286.067)",
            },
            {
                id: "Broken Down",
                label: "Broken Down",
                value: brokenDown,
                color: "oklch(71% 0.194 13.428)",
            },
        ]
    }, [])

    return (
        <ResponsivePie
            data={machineData}
            colors={{ datum: "data.color" }}
            cornerRadius={6}
            padAngle={4}
            enableArcLinkLabels={false}
            margin={{ top: 0, right: 0, bottom: 100, left: 0 }}
            arcLinkLabelsDiagonalLength={0}
            legends={[
                {
                    anchor: "bottom",
                    direction: "row",
                    itemDirection: "top-to-bottom",
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
