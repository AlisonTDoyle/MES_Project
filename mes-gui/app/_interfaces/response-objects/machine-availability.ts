export interface MachineAvailability {
    machineId: number,
    availability: number,
    plannedTime: number,
    downtime: number,
    isDown: boolean,
    eventCount: number
}