import { ArrowRightStartOnRectangleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { ReturnToHomeButton } from "./return-to-home-button"

export function Sidebar() {
    let recentItems:{id:string,type:string}[] = [
        {id: '1234567890', type: 'Machine'},
        {id: '0987654321', type: 'PO'},
        {id: '1122334455', type: 'Machine'},
        {id: '5566778899', type: 'PO'},
        {id: '5566778899', type: 'PO'},
        {id: '5566778899', type: 'PO'},
        {id: '1122334455', type: 'Machine'},
        {id: '1122334455', type: 'Machine'},
        {id: '5566778899', type: 'PO'},
        {id: '1122334455', type: 'Machine'},
    ]

    return (
        <div className="bg-base-100 w-80 p-4 shadow-lg h-full flex flex-col">

            {/* TOP AREA */}
            <div className="flex flex-col flex-1 min-h-0">
                <ReturnToHomeButton />
                {/* Filter */}
                <div className="join mb-4">
                    <select className="select join-item">
                        <option>PO</option>
                        <option>Machine</option>
                    </select>
                    <input className="input join-item" placeholder="Enter ID..." />
                    <button className="btn btn-primary join-item">
                        <MagnifyingGlassIcon className="w-5 h-5"/>
                    </button>
                </div>

                {/* Recently Viewed */}
                <div className="flex flex-col min-h-0 h-full">
                    <h4 className="mb-2">Recently Viewed</h4>

                    <ul className="border border-base-300 rounded-box w-full flex-1 min-h-0 overflow-auto">
                        {recentItems.map((item) => (
                            <li key={item.id} className="list-row rounded-box m-1 px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-500/30">
                                <span>{item.id}</span>
                                <span className={`badge badge-soft ${item.type === 'PO' ? 'badge-error' : 'badge-info'}`}>{item.type}</span>
                            </li>
                        ))}
                    </ul>
                </div>


            </div>

            {/* BOTTOM MENU */}
            <div className="mt-auto">
                <div className="divider" />
                <ul className="menu menu-md w-full">
                    <li><a>Add New Production Line</a></li>
                    <li><a>Add New Machine</a></li>
                    <li>
                        <a className="bg-rose-100 hover:bg-rose-200 dark:bg-rose-400/20 dark:hover:bg-rose-400/30">
                            <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
                            <span>Sign Out</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
