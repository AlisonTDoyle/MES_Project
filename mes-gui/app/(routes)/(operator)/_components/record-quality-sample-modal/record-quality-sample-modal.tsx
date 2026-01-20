"use client";

export function RecordQualitySampleModal() {
    return (
        <div className="modal-box">
            <h3 className="font-bold text-lg">Record Quality Sample</h3>
            <form action="" className="my-2">
                <label className="input w-full mb-2">
                    Path
                    <input type="text" className="grow" placeholder="src/app/" />
                </label>
            </form>
            <div className="modal-action">
                <form method="dialog">
                    <button className="btn btn-primary mx-2">Submit</button>
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                </form>
            </div>
        </div>
    );
}