"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function AdminLogin() {
    const [secretKey, setSecretKey] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ secretKey }),
            });

            if (!res.ok) throw new Error("Invalid secret key");

            router.push("/admin/logs");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center bg-zinc-950">
            <Head>
                <title>Admin Login</title>
                <meta name="robots" content="noindex" />
            </Head>

            <h1 className="text-3xl font-bold text-center mb-8 text-[var(--primaryColor)]">
                Admin Portal
            </h1>

            <form
                onSubmit={handleLogin}
                className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl"
            >
                <h2 className="text-xl font-semibold mb-6 text-center text-white">
                    Access Required
                </h2>

                <div className="mb-6">
                    <label htmlFor="secretKey" className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 px-1">
                        Secret Key
                    </label>
                    <input
                        id="secretKey"
                        type="password"
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                        className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-[var(--primaryColor)] focus:ring-1 focus:ring-[var(--primaryColor)] transition-all"
                        required
                        autoFocus
                        placeholder="••••••••"
                    />
                </div>

                {error && (
                    <p className="text-red-500 mb-6 text-sm text-center bg-red-500/10 p-3 rounded-lg border border-red-500/20 animate-pulse">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[var(--primaryColor)] hover:opacity-90 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50"
                >
                    {loading ? "Verifying..." : "Access Portal"}
                </button>

                <p className="mt-8 text-center text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold">
                    Authorized Personnel Only
                </p>
            </form>
        </div>
    );
}
