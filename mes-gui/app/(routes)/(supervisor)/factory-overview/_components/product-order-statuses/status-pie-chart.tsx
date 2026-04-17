"use client"
import { ResponsivePie } from "@nivo/pie"
import { useMemo } from "react"

export function StatusPieChart({ data }: { data: { status: number, statusDescription: string, workOrderCount: number }[] }) {
    let categoryColours = [
        "oklch(71% 0.194 13.428)",
        "oklch(82% 0.189 84.429)",
        "oklch(76% 0.177 163.223)",
    ]

    const machineData = useMemo(() => {
        let datapoints = [];
        for (let item of data) {
            let datapoint = {
                id: item.statusDescription,
                label: item.statusDescription,
                value: item.workOrderCount,
                color: categoryColours[item.status]
            }
            datapoints.push(datapoint);
        }
        return datapoints;
    }, [data]) // 👈 add data as dependency

    return (
        <ResponsivePie
            data={machineData}
            colors={{ datum: "data.color" }}
            cornerRadius={6}
            padAngle={4}
            enableArcLinkLabels={false}
            margin={{ top: 0, right: 0, bottom: 100, left: 0 }}
            arcLinkLabelsDiagonalLength={0}
            isInteractive={false}
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
