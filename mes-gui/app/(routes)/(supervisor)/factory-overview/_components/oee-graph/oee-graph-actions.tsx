"use server"

import { OeeFigures } from "@/app/_interfaces/response-objects/oee-figures";

let _apiUrl = process.env.NEXT_PUBLIC_API_URL + "/factory/oee";

export async function FetchOeeFigures() {
    let data:OeeFigures|null = null;

    try {
        const res = await fetch(_apiUrl, {cache: 'no-store'});
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        data = json.message || [];
    } catch (error) {
        console.error("Failed to fetch OEE figures:", error)
    }

    return data;
}