"use client";

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
            <div>
                <label htmlFor="">Email</label><br/>
                <input className="input mb-4 p-2 w-70 sm:w-100" type="text" name="text" id="email" required/>
            </div>

            <div>
                <label htmlFor="">Password</label><br/>
                <input className="input mb-4 w-70 sm:w-100" type="password" name="password" id="password"/>
            </div>

            <button onClick={Nav} className="btn-primary w-100 mb-4">Sign In</button><br/>
            {/* <button type='button' className="rounded border border-red-800 p-2 w-70 sm:w-100 hover:cursor-pointer">Forgot Password</button> */}
            <button type='button' className="btn-secondary w-100">Forgot Password</button>
        </div>
    )
}