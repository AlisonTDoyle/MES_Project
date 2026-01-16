"use client";

import { ResponsiveSankey } from "@nivo/sankey"

export function SankeyGeneaologyGraph() {
    let data = {
        "nodes": [
            {
                "id": "Steel 5x11",
                "nodeColor": "hsl(210, 70%, 40%)"
            },
            {
                "id": "Insulation",
                "nodeColor": "hsl(120, 60%, 50%)"
            },
            {
                "id": "Adhesive",
                "nodeColor": "hsl(200, 60%, 55%)"
            },
            {
                "id": "Sealant",
                "nodeColor": "hsl(150, 60%, 45%)"
            },
            {
                "id": "Rivets",
                "nodeColor": "hsl(270, 60%, 55%)"
            },
            {
                "id": "Cutting",
                "nodeColor": "hsl(30, 70%, 50%)"
            },
            {
                "id": "Forming",
                "nodeColor": "hsl(45, 70%, 50%)"
            },
            {
                "id": "Assembly",
                "nodeColor": "hsl(80, 60%, 45%)"
            },
            {
                "id": "Sealing & Finishing",
                "nodeColor": "hsl(160, 60%, 45%)"
            },
            {
                "id": "Finished Ducting Panel",
                "nodeColor": "hsl(260, 70%, 50%)"
            }
        ],
        "links": [
            {
                "source": "Steel 5x11",
                "target": "Cutting",
                "value": 450
            },
            {
                "source": "Cutting",
                "target": "Forming",
                "value": 900
            },
            {
                "source": "Forming",
                "target": "Assembly",
                "value": 860
            },
            {
                "source": "Insulation",
                "target": "Assembly",
                "value": 800
            },
            {
                "source": "Rivets",
                "target": "Assembly",
                "value": 120
            },
            {
                "source": "Assembly",
                "target": "Sealing & Finishing",
                "value": 780
            },
            {
                "source": "Adhesive",
                "target": "Sealing & Finishing",
                "value": 90
            },
            {
                "source": "Sealant",
                "target": "Sealing & Finishing",
                "value": 70
            },
            {
                "source": "Sealing & Finishing",
                "target": "Finished Ducting Panel",
                "value": 750
            }
        ]
    }


    return (
        <ResponsiveSankey /* or Sankey for fixed dimensions */
            data={data}
            margin={{ top: 40, right: 160, bottom: 40, left: 40 }}
            align="justify"
            colors={{ scheme: 'category10' }}
            nodeOpacity={1}
            nodeHoverOthersOpacity={0.35}
            nodeThickness={18}
            nodeSpacing={24}
            nodeBorderWidth={0}
            nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
            nodeBorderRadius={3}
            linkOpacity={0.5}
            linkHoverOthersOpacity={0.1}
            linkContract={3}
            enableLinkGradient={true}
            labelPosition="outside"
            labelOrientation="vertical"
            labelPadding={16}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    translateX: 130,
                    itemWidth: 100,
                    itemHeight: 14,
                    itemDirection: 'right-to-left',
                    itemsSpacing: 2,
                    itemTextColor: '#999',
                    symbolSize: 14
                }
            ]}
        />
    )
}