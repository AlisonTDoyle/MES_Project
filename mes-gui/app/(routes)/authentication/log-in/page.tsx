"use client";

import Link from "next/link";
import React from "react";
import { handleSignIn } from "@/utils/cognitoActions";

export default function LogIn() {
  const [errorMessage, dispatch, isPending] = React.useActionState(
    handleSignIn,
    undefined
  );

  return (
    <form action={dispatch} className="w-100">
      <fieldset className="fieldset">
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="input validator w-100"
          placeholder="example@email.com"
          required
        />
      </fieldset>

      <fieldset className="fieldset mb-4">
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="input validator w-100"
          placeholder="Password"
          required
        />
      </fieldset>

      {errorMessage && (
        <div className="alert alert-error mb-3 w-100">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary w-100 mb-2"
        disabled={isPending}
      >
        {isPending ? "Signing In..." : "Sign In"}
      </button>

      <Link
        href="/authentication/forgot-password"
        className="btn btn-soft btn-primary w-100"
      >
        Forgot Password
      </Link>
    </form>
  );
}
