export function Assembly () {let data:{
        partNumber:string,
        description:string,
        lineNo:number,
        machineNo:number,
        status:string
    }[] = [
        {
            "partNumber": "123-123-1234",
            "description": "This is a test",
            "lineNo": 1,
            "machineNo": 1,
            "status": "Completed"
        },
        {
            "partNumber": "123-123-1235",
            "description": "Bottom Panel",
            "lineNo": 1,
            "machineNo": 1,
            "status": "Scheduled"
        },
        {
            "partNumber": "123-123-1235",
            "description": "Bottom Panel",
            "lineNo": 1,
            "machineNo": 1,
            "status": "Scheduled"
        },
        {
            "partNumber": "123-123-1236",
            "description": "Matt Black Powdered Metal",
            "lineNo": 1,
            "machineNo": 1,
            "status": "Not Started"
        },
        {
            "partNumber": "123-123-1234",
            "description": "This is a test",
            "lineNo": 1,
            "machineNo": 1,
            "status": "Completed"
        },
        {
            "partNumber": "123-123-1235",
            "description": "Bottom Panel",
            "lineNo": 1,
            "machineNo": 1,
            "status": "Scheduled"
        },
        {
            "partNumber": "123-123-1236",
            "description": "Matt Black Powdered Metal",
            "lineNo": 1,
            "machineNo": 1,
            "status": "Not Started"
        },
        {
            "partNumber": "123-123-1234",
            "description": "This is a test",
            "lineNo": 1,
            "machineNo": 1,
            "status": "Completed"
        },
        {
            "partNumber": "123-123-1235",
            "description": "Bottom Panel",
            "lineNo": 1,
            "machineNo": 1,
            "status": "Scheduled"
        },
        {
            "partNumber": "123-123-1236",
            "description": "Matt Black Powdered Metal",
            "lineNo": 1,
            "machineNo": 1,
            "status": "Not Started"
        },
        {
            "partNumber": "123-123-1234",
            "description": "This is a test",
            "lineNo": 1,
            "machineNo": 1,
            "status": "Completed"
        },
        {
            "partNumber": "123-123-1235",
            "description": "Bottom Panel",
            "lineNo": 1,
            "machineNo": 1,
            "status": "Scheduled"
        },
        {
            "partNumber": "123-123-1236",
            "description": "Matt Black Powdered Metal",
            "lineNo": 1,
            "machineNo": 1,
            "status": "Not Started"
        },
        {
            "partNumber": "123-123-1234",
            "description": "This is a test",
            "lineNo": 1,
            "machineNo": 1,
            "status": "Completed"
        },
        {
            "partNumber": "123-123-1235",
            "description": "Bottom Panel",
            "lineNo": 1,
            "machineNo": 1,
            "status": "Scheduled"
        },
        {
            "partNumber": "123-123-1236",
            "description": "Matt Black Powdered Metal",
            "lineNo": 1,
            "machineNo": 1,
            "status": "Not Started"
        }
    ]

    return (
            <table className="table table-xs rounded-box border border-base-content/5 overflow-auto table-pin-rows">
                <thead>
                    <tr>
                        <th>Part Number</th>
                        <th>Description</th>
                        <th>Line No.</th>
                        <th>Machine No.</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d) => (
                        <tr key={d.partNumber}>
                            <td>{d.partNumber}</td>
                            <td>{d.description}</td>
                            <td>{d.lineNo}</td>
                            <td>{d.machineNo}</td>
                            <td>{d.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    )
}