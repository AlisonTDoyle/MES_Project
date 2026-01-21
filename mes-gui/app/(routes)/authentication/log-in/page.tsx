"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

export default function LogIn() {
    const router = useRouter()

    function Nav(event: MouseEvent<HTMLButtonElement>) {
        let email = document.getElementById("email") as HTMLSelectElement;

        if (email.value == "admin") {
            console.log("true")
            router.replace('/quick-view')
        } else {
            router.replace('/')
        }
    }

    return (
        <div>
            <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" className="input validator w-100" placeholder="example@email.com" required />
                <p className="validator-hint hidden m-0">Required</p>
            </fieldset>

            <label className="fieldset mb-4">
                <span className="label">Password</span>
                <input type="password" className="input validator w-100" placeholder="Password" required />
                <span className="validator-hint hidden m-0">Required</span>
            </label>

            <button onClick={Nav} className="btn btn-primary w-100 mb-2">Sign In</button><br />
            <Link href={'/authentication/forgot-password'} className="btn btn-soft btn-primary w-100">Forgot Password</Link>
        </div>
    )
}