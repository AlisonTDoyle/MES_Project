import { PlayIcon, PauseIcon, CheckIcon } from "@heroicons/react/24/solid"

export function CurrentWorkOrder () {
    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h3>Current Work Order</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>ID</td>
                            <td>WO-12345678</td>
                        </tr>
                        <tr>
                            <td>Material</td>
                            <td>Steel</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <button className="btn btn-success"><PlayIcon className="w-4"/><span>Start WO</span></button>
                <button className="btn btn-warning"><PauseIcon className="w-4"/>Pause WO</button>
                <button className="btn btn-primary"><CheckIcon className="w-4"/><span>Mark WO Complete</span></button>
            </div>
        </div>
    )
}