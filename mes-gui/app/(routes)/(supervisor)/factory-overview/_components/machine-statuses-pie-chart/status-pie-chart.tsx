"use client"
import { MachineAvailability } from "@/app/_interfaces/response-objects/machine-availability"
import { ResponsivePie } from "@nivo/pie"
import { useMemo } from "react"

export function StatusPieChart({data}:{data:MachineAvailability[]}) {
    const machineData = useMemo(() => {
        const total = 100
        let running = 0;
        let offline = 0;

        for (let i = 0; i < data.length; i++) {
            if (data[i].isDown) {
                offline += 1;
            } else {
                running +=1;
            }
        }

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
                color: "oklch(71% 0.194 13.428)",
            },
        ]
    }, [data])

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
