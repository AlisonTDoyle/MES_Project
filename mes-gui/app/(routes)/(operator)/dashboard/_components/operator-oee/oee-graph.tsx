"use client"
import { PieLayer, ResponsivePie } from "@nivo/pie"

let data = [
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

export function OeeGraph() {
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
                    fontSize={32}
                >
                    {percent}%
                </text>
            </g>
        );
    };

    return (
        <ResponsivePie /* or Pie for fixed dimensions */
            data={data}
            colors={{ datum: 'data.color' }}
            margin={{ top: 0, right: 80, bottom: 200, left: 80 }}
            startAngle={-90}
            endAngle={90}
            cornerRadius={6}
            innerRadius={0.72}
            arcLinkLabelsDiagonalLength={0}
            enableArcLabels={false}
            enableArcLinkLabels={false}
            layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]} />
    )
}