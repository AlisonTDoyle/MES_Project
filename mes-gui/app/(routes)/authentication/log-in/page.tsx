"use client"

import React, { FormEvent, useState } from "react";
import { Amplify } from "aws-amplify";
import { signIn, confirmSignIn, fetchAuthSession } from "aws-amplify/auth";
import outputs from "./../../../../amplify_outputs.json";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import Link from "next/link";

Amplify.configure(outputs);

interface SignInFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface SignInForm extends HTMLFormElement {
  readonly elements: SignInFormElements;
}

export default function LogIn() {
  const [hideError, setHideError] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function showError(message: string) {
    setErrorMessage(message);
    setHideError(false);
  }

  function validate(email: string, password: string) {
    if (!email) return "Please enter email";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email";
    if (!password) return "Please enter password";
    return null;
  }

  async function handleSubmit(event: FormEvent<SignInForm>) {
    event.preventDefault();
    setHideError(true);
    setLoading(true);

    const form = event.currentTarget;
    const email = form.elements.email.value.trim();
    const password = form.elements.password.value;

    const validationError = validate(email, password);
    if (validationError) {
      showError(validationError);
      setLoading(false);
      return;
    }

    try {
      let res = await signIn({
        username: email,
        password,
      });

      // Handle new password challenge
      if (res.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED") {
        res = await confirmSignIn({
          challengeResponse: "P4ssword@1", // usually should prompt user instead
        });
      }

      if (res.nextStep.signInStep === "DONE") {
        const session = await fetchAuthSession();

        const groups: any =
          session.tokens?.idToken?.payload["cognito:groups"] || [];

        if (groups.includes("admin")) {
          router.push("/factory-overview");
        } else {
          router.push("/dashboard");
        }
      }

    } catch (err: any) {
      console.error(err);
      showError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-100 max-w-md mx-auto">

      {/* Error Alert */}
      <div
        role="alert"
        className="alert alert-error alert-soft mb-4"
        hidden={hideError}
      >
        <ExclamationCircleIcon className="h-6 w-6" />
        <span><b>Error:</b> {errorMessage}</span>
      </div>

      {/* Email */}
      <fieldset className="my-4">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          name="email"
          className="input input-bordered w-full"
          placeholder="Enter email"
        />
      </fieldset>

      {/* Password */}
      <fieldset className="my-4">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          name="password"
          className="input input-bordered w-full"
          placeholder="Enter password"
        />
      </fieldset>

      {/* Submit */}
      <button
        type="submit"
        className={`mb-2 btn btn-primary w-full ${loading ? "btn-disabled" : ""}`}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
      <Link href='/authentication/forgot-password' className="btn btn-soft btn-primary w-100" type="button">Forgot Password</Link>
    </form>
  );
}