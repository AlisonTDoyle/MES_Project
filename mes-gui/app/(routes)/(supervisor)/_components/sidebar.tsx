"use client"

import { useState } from "react"
import { ArrowRightStartOnRectangleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { ReturnToHomeButton } from "./return-to-home-button"
import { Search } from "./sidebar-actions"

interface RecentItem {
    id: string
    type: string
    additionalInfo?: string
}

export function Sidebar() {
    const [listItems, setListItems] = useState<RecentItem[]>([])
    const [listName, setListName] = useState<string>("Recently Viewed")

    const handleSearch = async (formData: FormData) => {
        setListName("Search Results")
        const searchResults = await Search(formData)
        setListItems(searchResults)

        if (searchResults.length === 0) {
            setListName("Recently Viewed")
        }
    }


    return (
        <div className="bg-base-100 w-80 p-4 shadow-lg h-full flex flex-col">
            {/* TOP AREA */}
            <div className="flex flex-col flex-1 min-h-0">
                <ReturnToHomeButton />
                <form action={handleSearch}>
                    <div className="join mb-4">
                        <select className="select join-item" id="searchObject" name="searchObject">
                            <option value="1">PO</option>
                            <option value="2">Machine</option>
                        </select>
                        <input className="input join-item" placeholder="Search..." id="searchTerm" name="searchTerm" />
                        <button className="btn btn-primary join-item">
                            <MagnifyingGlassIcon className="w-5 h-5" />
                        </button>
                    </div>
                </form>

                {/* Items List */}
                <div className="flex flex-col min-h-0 h-full">
                    <h4 className="mb-2">{listName}</h4>
                    <ul className="list border border-base-300 rounded-box w-full flex-1 min-h-0 overflow-auto">
                        {listItems.map((item) => (
                            <li key={item.id} className="list-row px-2 py-1 hover:bg-neutral-100 hover:cursor-pointer dark:hover:bg-neutral-500/30">
                                <div></div>
                                <div>
                                    <span>{item.id}</span><br></br>
                                    <span className="text-sm text-gray-500">{item.additionalInfo}</span>
                                </div>
                                <div>
                                    <span className={`h-full badge badge-soft ${item.type === 'PO' ? 'badge-error' : 'badge-info'}`}>{item.type}</span>
                                </div>
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
                </ul>
                <a className="btn btn-error w-full">
                    <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
                    <span>Sign Out</span>
                </a>
            </div>
        </div>
    )
}
