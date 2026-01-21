import Link from "next/link";

export default function ForgotPassword() {
    return (
        <div>
            <form>
                <fieldset className="fieldset mb-4">
                    <label className="label">Email</label>
                    <input type="email" className="input validator w-100" placeholder="example@email.com" required />
                    <p className="validator-hint hidden m-0">Required</p>
                </fieldset>

                <button className="btn btn-primary w-100 mb-2">Send Recovery Email</button><br />
                <Link href='/authentication/log-in' className="btn btn-soft btn-primary w-100" type="button">Sign In</Link>
            </form>
        </div>
    )
}