"use client"
import { PieLayer, ResponsivePie } from "@nivo/pie"

let machineData = [
    {
        "id": "Running",
        "label": "Running",
        "value": 32,
        "color": "hsl(159.74 100% 37%)"
    },
    {
        "id": "Offline",
        "label": "Offline",
        "value": 10,
        "color": "hsl(215.38 18% 47%)"
    }];

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
                fill="black"
                fontWeight={600}
            >
                {percent}%
            </text>
        </g>
    );
};

export function OeeRadialChart() {
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
            enableArcLinkLabels={false}
            layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]} />
    )
}