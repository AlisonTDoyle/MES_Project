"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { ArrowRightStartOnRectangleIcon, MagnifyingGlassIcon, DocumentIcon, Cog6ToothIcon } from "@heroicons/react/24/solid"
import { ReturnToHomeButton } from "./return-to-home-button"
import { Search } from "./sidebar-actions"
import { signOut } from 'aws-amplify/auth';
import outputs from "./../../../../amplify_outputs.json";
import { Amplify } from "aws-amplify";

Amplify.configure(outputs);

interface RecentItem {
    databaseId?: string
    id: string
    type: string
    additionalInfo?: string
}

export function Sidebar() {
    let router = useRouter();

    const [listItems, setListItems] = useState<RecentItem[]>([])
    const [listName, setListName] = useState<string>("Recently Viewed")

    async function handleSignOut() {
        await signOut();
        router.push("/authentication/log-in")
    }

    // on component mount, get recently viewed items from local storage
    useEffect(() => {
        const recentItems = GetRecentlyViewed();
        setListItems(recentItems);
    }, [])

    function GetRecentlyViewed() {
        let recentItems: RecentItem[] = [];

        recentItems = localStorage.getItem('recentlyViewed') ? JSON.parse(localStorage.getItem('recentlyViewed') as string) : [];

        return recentItems;
    }

    function UpdateRecentlyViewed(item: RecentItem) {
        let recentItems: RecentItem[] = [];

        // get current local storage
        recentItems = localStorage.getItem('recentlyViewed') ? JSON.parse(localStorage.getItem('recentlyViewed') as string) : [];
        console.log("Current recently viewed items:", recentItems);

        // remove oldest item and add newest
        if (recentItems.length >= 10) {
            recentItems.splice(0, 1);
        }

        // check if item already exists in recent items
        const existingIndex = recentItems.findIndex((i) => i.id === item.id && i.type === item.type);
        if (existingIndex !== -1) {
            // if it exists, remove it from its current position
            recentItems.splice(existingIndex, 1);
        }
        recentItems.push(item);


        // update local storage
        localStorage.setItem('recentlyViewed', JSON.stringify(recentItems));
    }


    const handleSearch = async (formData: FormData) => {
        setListName("Search Results")
        const searchResults = await Search(formData)
        setListItems(searchResults)

        if (searchResults.length === 0) {
            setListName("Recently Viewed")
            setListItems(GetRecentlyViewed())
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
                            <li key={item.id}
                                className="list-row px-2 py-1 hover:bg-neutral-100 hover:cursor-pointer dark:hover:bg-neutral-500/30"
                                onClick={() => {
                                    UpdateRecentlyViewed(item)
                                    if (item.type === 'PO') {
                                        router.push(`/production-order/${item.databaseId}`)
                                    }
                                }}>
                                <div></div>
                                <div>
                                    <span>{item.id}</span><br></br>
                                    <span className="text-sm text-gray-500">{item.additionalInfo}</span>
                                </div>
                                <div>
                                    <span className={`h-full badge badge-soft ${item.type === 'PO' ? 'badge-error' : 'badge-info'}`} title={item.type === 'PO' ? 'Production Order' : 'Machine'}>
                                        {
                                            item.type === 'PO' ? <DocumentIcon className="w-4 h-4" title="Production Order" /> : <Cog6ToothIcon className="w-4 h-4" />
                                        }
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* BOTTOM MENU */}
            <div className="mt-auto">
                <div className="divider" />
                <button className="btn btn-error w-full" onClick={handleSignOut}>
                    <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    )
}
