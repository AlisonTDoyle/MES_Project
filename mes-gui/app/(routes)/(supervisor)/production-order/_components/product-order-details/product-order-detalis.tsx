export function ProductOrderDetails () {
    return (
        <div>
            <h3>PO Details</h3>
            <table>
                <tbody>
                    <tr>
                        <td>PO ID:</td>
                        <td>123456789</td>
                    </tr>
                    <tr>
                        <td>Customer ID:</td>
                        <td>12345678</td>
                    </tr>
                    <tr>
                        <td>Order Received:</td>
                        <td>{(new Date()).toISOString()}</td>
                    </tr>
                    <tr>
                        <td>Deadline:</td>
                        <td>{(new Date()).toISOString()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}