"use server"

export async function GetMachineEventTypes() {
    return await fetch("http://localhost:3001/api/machine-event/type")
        .then((res) => res.json())
        .then((data) => data.data)
}