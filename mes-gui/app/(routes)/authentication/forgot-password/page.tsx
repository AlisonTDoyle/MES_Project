"use client"

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { Amplify } from "aws-amplify";
import {
  resetPassword,
  confirmResetPassword,
} from "aws-amplify/auth";
import outputs from "./../../../../amplify_outputs.json";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

Amplify.configure(outputs);

export default function ForgotPassword() {
  const [step, setStep] = useState<"REQUEST" | "CONFIRM">("REQUEST");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [hideError, setHideError] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function showError(message: string) {
    setErrorMessage(message);
    setHideError(false);
  }

  function validateEmail(email: string) {
    if (!email) return "Please enter email";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email";
    return null;
  }

  async function handleRequestReset(e: FormEvent) {
    e.preventDefault();
    setHideError(true);
    setLoading(true);

    const validationError = validateEmail(email);
    if (validationError) {
      showError(validationError);
      setLoading(false);
      return;
    }

    try {
      await resetPassword({ username: email });
      setStep("CONFIRM");
      setSuccessMessage("Verification code sent to your email");
    } catch (err: any) {
      showError(err.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmReset(e: FormEvent) {
    e.preventDefault();
    setHideError(true);
    setLoading(true);

    if (!code) {
      showError("Enter verification code");
      setLoading(false);
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      showError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword: newPassword,
      });

      setSuccessMessage("Password reset successfully. You can now sign in.");
      setStep("REQUEST");
      setEmail("");
      setCode("");
      setNewPassword("");
    } catch (err: any) {
      showError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={step === "REQUEST" ? handleRequestReset : handleConfirmReset}
      >
        {/* Error */}
        <div
          role="alert"
          className="alert alert-error alert-soft mb-4"
          hidden={hideError}
        >
          <ExclamationCircleIcon className="h-6 w-6" />
          <span><b>Error:</b> {errorMessage}</span>
        </div>

        {/* Success */}
        {successMessage && (
          <div className="alert alert-success alert-soft mb-4">
            <span>{successMessage}</span>
          </div>
        )}

        {/* STEP 1: Request reset */}
        {step === "REQUEST" && (
          <>
            <fieldset className="fieldset mb-4">
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>

            <button
              className={`btn btn-primary w-full mb-2 ${loading ? "btn-disabled" : ""}`}
            >
              {loading ? "Sending..." : "Send Recovery Email"}
            </button>
          </>
        )}

        {/* STEP 2: Confirm reset */}
        {step === "CONFIRM" && (
          <>
            <fieldset className="fieldset mb-4">
              <label className="label">Verification Code</label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset mb-4">
              <label className="label">New Password</label>
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </fieldset>

            <button
              className={`btn btn-primary w-full mb-2 ${loading ? "btn-disabled" : ""}`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        {/* Back to login */}
        <Link
          href="/authentication/log-in"
          className="btn btn-soft btn-primary w-full"
        >
          Sign In
        </Link>
      </form>
    </div>
  );
}