"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await fetch(`${ BASE_URL }/api/auth/login`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if(!res.ok) {
            setError(data.error);
            return;
        }

        router.push("/dashboard");
    };

    return (
        <main className="max-w-md mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Coordinator Login</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <button className="w-full bg-blue-600 text-white p-2 rounded">
                    Login
                </button>
            </form>

            {error && <p className="mt-4 text-red-600">{error}</p>}
        </main>
    );
}