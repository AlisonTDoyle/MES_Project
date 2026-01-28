"use client"
import { PieLayer, ResponsivePie } from "@nivo/pie"
import { useMemo } from "react"

export function OeeGraph() {
    const data = useMemo(() => {
        const efficiency = Math.floor(Math.random() * 100) + 1
        const potential = Math.floor(Math.random() * 100) + 1

        return [
            {
                id: "Efficiency",
                label: "Efficiency",
                value: efficiency,
                color: "hsl(159.74 100% 37%)",
            },
            {
                id: "Potential",
                label: "Potential",
                value: potential,
                color: "hsl(215.38 18% 47%)",
            },
        ]
    }, [])

    const CenteredMetric: PieLayer<any> = ({ centerX, centerY, dataWithArc }) => {
        const total = dataWithArc.reduce((s, d) => s + d.value, 0)
        const efficiency = dataWithArc.find(d => d.data.id === "Efficiency")?.value ?? 0
        const percent = total ? Math.round((efficiency / total) * 100) : 0

        return (
            <g transform={`translate(${centerX}, ${centerY})`}>
                <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#999"
                    fontWeight={600}
                    fontSize={32}
                >
                    {percent}%
                </text>
            </g>
        )
    }

    return (
        <ResponsivePie
            data={data}
            colors={{ datum: "data.color" }}
            margin={{ top: 0, right: 20, bottom: 120, left: 20 }}
            startAngle={-90}
            endAngle={90}
            cornerRadius={6}
            innerRadius={0.72}
            enableArcLabels={false}
            enableArcLinkLabels={false}
            layers={["arcs", "arcLabels", "arcLinkLabels", "legends", CenteredMetric]}
        />
    )
}
