"use client"

import { FactoryEvent } from "@/app/_interfaces/factory-event"
import { ResponsiveLine } from "@nivo/line"
import { useMemo } from "react"
import { prepareHourlyOutput } from "./output-target-graph-actions"
import { useTheme } from "@/app/hooks/useTheme"

export function LineGraph({events} : {events:FactoryEvent[]}) {
    const isDark = useTheme()

    const theme = {
        text: { fill: isDark ? "#aaa" : "#333" },
        grid: { line: { stroke: isDark ? "#333" : "#e0e0e0" } },
        axis: {
            ticks: {
                text: { fill: isDark ? "#aaa" : "#333" },
                line: { stroke: isDark ? "#555" : "#ccc" },
            },
            legend: {
                text: { fill: isDark ? "#aaa" : "#333" },  
            },
            domain: {
                line: { stroke: isDark ? "#555" : "#ccc" },
            },
        },
        tooltip: {
            container: {
                background: isDark ? "#1d232a" : "#ffffff",
                color: isDark ? "#aaa" : "#333",
            },
        },
    }

    const data = useMemo(() => {
        return [
            {
                id: "Output",
                data: prepareHourlyOutput(events),
            }
        ]
    }, [events])

    return (
        <>
            <ResponsiveLine
                theme={theme}
                isInteractive={true}
                useMesh = {true}
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
                        symbolShape: "circle",
                        symbolSize: 18,
                        toggleSerie: true,
                        translateY: 56
                    },
                ]}
            />
        </>
    )
}
