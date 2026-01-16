export function QualityControl() {
    return (
        <div className="h-full grid lg:grid-cols-2 gap-2">
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
                    
                </tbody>
            </table>
            <div className="rounded-box border border-base-content/5 p-4">
                <h3>Results for: XXX</h3>
                <label>Notes:</label>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
    )
}