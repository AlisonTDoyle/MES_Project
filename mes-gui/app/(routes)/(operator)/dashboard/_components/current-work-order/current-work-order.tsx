import { PlayIcon, PauseIcon, CheckIcon } from "@heroicons/react/24/solid"

export function CurrentWorkOrder () {
    return (
        <div className="card shadow-sm h-full">
            <div className="card-body flex flex-col flex-1 min-h-0">
                <span className="card-title shrink-0 pb-2">Current Work Order</span>
                <table className="table">
                    <tbody>
                        <tr>
                            <td className="font-bold">ID</td>
                            <td>WO-12345678</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Material</td>
                            <td>Titanium</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Length</td>
                            <td>5 m</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Breadth</td>
                            <td>2.5 m</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Quantity</td>
                            <td>5</td>
                        </tr>
                    </tbody>
                </table>
                <div className="mt-auto flex flex-col gap-2">
                    <button className="btn btn-success"><PlayIcon className="w-4"/><span>Start WO</span></button>
                    <button className="btn btn-warning"><PauseIcon className="w-4"/>Pause WO</button>
                    <button className="btn btn-primary"><CheckIcon className="w-4"/><span>Mark WO Complete</span></button>
                </div>
            </div>
        </div>
    )
}