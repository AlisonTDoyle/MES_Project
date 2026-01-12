export default function ForgotPassword() {
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="">Email</label><br/>
                    <input className="border border-neutral-500 rounded mb-4 p-2 w-70 sm:w-100" type="text" name="email" id="email" required/>
                </div>

                <button className="rounded bg-red-800 p-2 w-70 sm:w-100 hover:cursor-pointer mb-4">Send Recovery Email</button><br/>
                <button className="rounded border border-red-800 p-2 w-70 sm:w-100 hover:cursor-pointer">Sign In</button>
            </form>
        </div>
    )
}