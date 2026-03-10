"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function SessionHeartbeat() {
    const router = useRouter();
    const pathname = usePathname();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // If we're not in admin, or we're on the login page (via some other check), don't run heartbeat here
        // In this app, the login is a conditional render on /admin/logs/page.tsx
        // So we check if we are on the admin logs page
        if (!pathname.startsWith("/admin")) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        const checkSession = async () => {
            try {
                const res = await fetch("/api/auth/verify");
                if (!res.ok) {
                    // Session invalid or expired
                    // This will trigger the parent components to re-check authentication
                    // For safety, we refresh the page which will reset the state
                    window.location.reload();
                }
            } catch (err) {
                console.error("Heartbeat check failed", err);
            }
        };

        // Check initially
        checkSession();

        // Check every 2 minutes
        intervalRef.current = setInterval(checkSession, 120000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [pathname, router]);

    return null;
}
