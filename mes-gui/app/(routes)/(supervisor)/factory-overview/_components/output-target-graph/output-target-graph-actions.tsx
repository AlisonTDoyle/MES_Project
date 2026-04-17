import { FactoryEvent } from "@/app/_interfaces/factory-event"

export function prepareHourlyOutput(events: FactoryEvent[]) {
    const hourlyCounts: Record<string, number> = {}

    for (const event of events) {
        const hour = new Date(event.timestamp).getHours()
        const bucket = Math.floor(hour / 2) * 2 
        const key = `${String(bucket).padStart(2, "0")}:00`
        hourlyCounts[key] = (hourlyCounts[key] ?? 0) + 1
    }

    // Fill every 2-hour slot from 00:00 to 22:00 with 0 if no data
    const allSlots = Array.from({ length: 12 }, (_, i) => `${String(i * 2).padStart(2, "0")}:00`)

    return allSlots.map(slot => ({
        x: slot,
        y: hourlyCounts[slot] ?? 0,
    }))
}