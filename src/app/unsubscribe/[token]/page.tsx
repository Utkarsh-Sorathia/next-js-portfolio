"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UnsubscribePage({ params }: { params: { token: string } }) {
  const { token } = params;
  const [status, setStatus] = useState<
    "loading" | "valid" | "invalid" | "done" | "error"
  >("loading");
  const [email, setEmail] = useState<string | null>(null);

  const router = useRouter();

  // Verify token
  useEffect(() => {
    fetch(`/api/unsubscribe/verify?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Invalid token");
        const data = await res.json();
        if (data.email) {
          setEmail(data.email);
          setStatus("valid");
        } else {
          setStatus("invalid");
        }
      })
      .catch(() => setStatus("invalid"));
  }, [token]);

  const handleUnsubscribe = async () => {
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (res.ok && data.success) setStatus("done");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full border border-white/10 p-6 rounded-xl shadow-xl text-gray-200">

        {/* Loading */}
        {status === "loading" && (
          <p className="text-gray-400">Verifying link...</p>
        )}

        {/* Invalid */}    
        {status === "invalid" && (
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white">Invalid Link</h2>
            <p className="text-gray-400">
              This unsubscribe link is invalid or has expired.
            </p>
          </div>
        )}

        {/* Valid */}
        {status === "valid" && email && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Unsubscribe</h2>
            <p className="text-gray-400">
              Do you really want to unsubscribe{" "}
              <span className="font-medium text-white">{email}</span>?
            </p>

            <button
              onClick={handleUnsubscribe}
              className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-white font-medium"
            >
              Yes, Unsubscribe
            </button>
          </div>
        )}

        {/* Done */}
        {status === "done" && (
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-semibold text-white">Unsubscribed</h2>
            <p className="text-gray-400">
              You have been removed from the newsletter.
            </p>
            <button
              onClick={() => router.push("/")}
              className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-medium"
            >
              Go to Home
            </button>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white">Error</h2>
            <p className="text-gray-400">
              Something went wrong. Please try again later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}