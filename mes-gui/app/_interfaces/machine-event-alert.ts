export interface MachineEventAlert {
    id: number;
    machineId: number;
    timestamp: string;
    description:string;
    type:string;
    issue:string;
}