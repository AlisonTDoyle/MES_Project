"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LogIn() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        if (email === "admin") {
            router.replace("/factory-overview");
            return;
        }

        if (email === "operator") {
            router.replace("/dashboard");
            return;
        }

        setError("Incorrect email or password.");
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                    className="input validator w-100"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                <p className="validator-hint hidden m-0">Required</p>
            </fieldset>

            <label className="fieldset mb-4">
                <span className="label">Password</span>
                <input type="password"
                    className="input validator w-100"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                <span className="validator-hint hidden m-0">Required</span>
            </label>

            {/* let user know if smt went wrong */}
            {error && (
                <div className="alert alert-error mb-3 w-100">
                    {error}
                </div>
            )}

            <button type="submit" className="btn btn-primary w-100 mb-2">
                Sign In
            </button>
            <Link href={'/authentication/forgot-password'} className="btn btn-soft btn-primary w-100">Forgot Password</Link>
        </form>
    )
}