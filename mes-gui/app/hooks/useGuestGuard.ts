"use client"

import { useEffect, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

export function useGuestGuard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      try {
        const session = await fetchAuthSession();

        const groups:any = session.tokens?.idToken?.payload["cognito:groups"] || [];

        if (groups.includes("admin")) {
            router.replace("/factory-overview");
        } else {
            router.replace("/dashboard");
        }
      } catch {
        // Not logged in → allowed to stay
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, [router]);

  return { loading };
}