"use client"

import { useEffect, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

export function useAuthGuard(requiredGroup?: string) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            try {
                const session = await fetchAuthSession();

                const groups:any =
                    session.tokens?.idToken?.payload["cognito:groups"] || [];

                if (!session.tokens) {
                    router.replace("/authentication/log-in");
                    return;
                }

                if (requiredGroup && !groups.includes(requiredGroup)) {
                    router.replace("/unauthorized"); // create this page
                    return;
                }

            } catch {
                router.replace("/authentication/log-in");
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, [requiredGroup, router]);

    return { loading };
}