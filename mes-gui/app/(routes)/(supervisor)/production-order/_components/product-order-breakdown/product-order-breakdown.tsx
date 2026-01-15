export function ProductOrderBreakdown () {

    return (
        <div className="card bg-base-100 card-md shadow-sm h-full">
            <div className="card-body">
                <h3 className="card-title">Order Breakdown</h3>
                <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                            <tr>
                                <th>Item Number</th>
                                <th>Part Number</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-base-300">
                                <td>12345</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>12345</td>
                                <td>Alliminium panel with dimensions 900mm x 400mm</td>
                                <td>2</td>
                                <td>In Progress</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>12345</td>
                                <td>Alliminium panel with dimensions 900mm x 400mm</td>
                                <td>2</td>
                                <td>In Progress</td>
                            </tr>
                            <tr className="bg-base-300">
                                <td>12345</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>12345</td>
                                <td>Alliminium panel with dimensions 900mm x 400mm</td>
                                <td>2</td>
                                <td>In Progress</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}