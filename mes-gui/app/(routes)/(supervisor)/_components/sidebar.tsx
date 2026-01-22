import { ArrowRightStartOnRectangleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { ReturnToHomeButton } from "./return-to-home-button"

export function Sidebar() {
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
                <div className="flex flex-col min-h-0">
                    <h4 className="mb-2">[Results Title]</h4>

                    <ul className="border border-base-300 rounded-box w-full flex-1 min-h-0 overflow-auto">
                        {Array(20).fill(1).map((_, i) => (
                            <li key={i} className="list-row rounded-box m-1 px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-500/30">
                                <span>1234567890</span>
                                <span className="badge badge-soft badge-info">Machine</span>
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
