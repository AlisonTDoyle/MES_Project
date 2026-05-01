"use client"
import { OeeFigures } from "@/app/_interfaces/response-objects/oee-figures";
import { PieLayer, ResponsivePie } from "@nivo/pie"

const CenteredMetric: PieLayer<{ id: string; label: string; value: number; color: string }> = ({ centerX, centerY, dataWithArc }) => {
    const total = dataWithArc.reduce((s, d) => s + d.value, 0);
    const running = dataWithArc.find(d => d.data.id === 'Running')?.value ?? 0;
    const percent = total ? Math.round((running / total) * 100) : 0;

    return (
        // raw svg styling needed here
        <g transform={`translate(${centerX}, ${centerY})`}>
            <text
                textAnchor="middle"
                dominantBaseline="central"
                fill="#999"
                fontWeight={600}
            >
                {percent}%
            </text>
        </g>
    );
};

export function OeeRadialChart({data}:{data:OeeFigures|null}) {
    let machineData = [
        {
            "id": "Running",
            "label": "Running",
            "value": data?.oee ?? 0,
            "color": "oklch(76% 0.177 163.223)"
        },
        {
            "id": "Offline",
            "label": "Offline",
            "value": 100 - (data?.oee ?? 0),
            "color": "oklch(70% 0.015 286.067)"
    }];

    return (
        <ResponsivePie data={machineData}
            colors={{ datum: 'data.color' }}
            startAngle={-90}
            endAngle={90}
            cornerRadius={6}
            innerRadius={0.72}
            margin={{ top: 0, right: 20, bottom: 120, left: 20 }}
            arcLinkLabelsDiagonalLength={0}
            enableArcLabels={false}
            isInteractive = {false}
            enableArcLinkLabels={false}
            layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}/>
    )
}