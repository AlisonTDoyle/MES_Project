"use server"

import { QualitySample } from "@/app/_interfaces/quality-sample";

const _apiUrl:string = process.env.NEXT_PUBLIC_API_URL as string + "/quality-sample";

export async function GetQualitySamples(productionOrderId: number): Promise<QualitySample[]> {
    const url = `${_apiUrl}?productionOrderId=${productionOrderId}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text().catch(() => "Unable to read error body");
            throw new Error(
                `GetQualitySamples failed: ${response.status} ${response.statusText} - ${errorText}`
            );
        }

        const json = await response.json();

        if (!json || !Array.isArray(json.data)) {
            throw new Error("GetQualitySamples: Invalid response format (expected data array)");
        }

        return json.data;
    } catch (error) {
        console.error("GetQualitySamples error", {
            productionOrderId,
            url,
            error: error instanceof Error ? error.message : error,
        });

        throw error;
    }
}