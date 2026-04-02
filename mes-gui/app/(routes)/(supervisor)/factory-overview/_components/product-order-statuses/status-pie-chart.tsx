"use client"
import { ResponsivePie } from "@nivo/pie"
import { useMemo } from "react"

export function StatusPieChart({data}: {data: {stage: number, statusDescription: string, workOrderCount:number}[]}) {
    let categoryColours = [
        "oklch(70% 0.2 220)",
        "oklch(82% 0.111 230.318)",
        "oklch(77% 0.152 181.912)",
        "oklch(76% 0.188 70.08)",
        "hsl(356.95 96% 58%)"
    ]
    
    const machineData = useMemo(() => {
        let datapoints = [];
        for (let item of data) {
            let datapoint = {
                id: item.statusDescription,
                label: item.statusDescription,
                value: item.workOrderCount,
                color: categoryColours[item.stage - 1]
            }
            datapoints.push(datapoint);
        }
        
        console.log(datapoints);
        return datapoints;
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
