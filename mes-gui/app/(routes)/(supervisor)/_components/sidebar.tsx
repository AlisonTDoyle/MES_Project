export function Sidebar() {
    return (
        <div className="p-4 shadow-sm h-full">
            <div>
                <h2>Search</h2>
                <div className='dual-input-right-leaning grid-cols-[60%_40%]'>
                    <select id="product-quantity" className="dual-input-left-control" >
                        <option>WO</option>
                        <option>Machine</option>
                    </select>
                    <input type="text" name="" id="product-quantity" className="dual-input-right-control" />
                  </div>
            </div>
            <div>
                <hr />
                <h2>Controls</h2>
                <button className="btn btn-primary w-full mb-2">Add New Line</button>
                <button className="btn btn-primary w-full">Add New Machine</button>
            </div>
        </div>
    )
}