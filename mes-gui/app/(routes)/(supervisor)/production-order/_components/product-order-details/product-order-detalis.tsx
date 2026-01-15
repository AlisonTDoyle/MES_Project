export function ProductOrderDetails() {
    return (
        <div className="card bg-base-100 card-md shadow-sm h-full">
           <div className="card-body">
                <h3 className="card-title">PO Details</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td><b>PO ID:</b></td>
                                <td>123456789</td>
                            </tr>
                            <tr>
                                <td><b>Customer ID:</b></td>
                                <td>12345678</td>
                            </tr>
                            <tr>
                                <td><b>Order Received:</b></td>
                                <td>{(new Date()).toISOString()}</td>
                            </tr>
                            <tr>
                                <td><b>Deadline:</b></td>
                                <td>{(new Date()).toISOString()}</td>
                            </tr>
                        </tbody>
                    </table>
           </div>
        </div>
    )
}