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
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center">
                <h1 className="font-bold mb-6 mt-10 text-center text-2xl/9 tracking-tight">Coordinator Login</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">Email Address</label>
                    <input
                        type="email"
                        placeholder=""
                        className="w-full border p-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">Password</label>
                    <input
                    type="password"
                    placeholder=""
                    className="w-full border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex justify-between w-full space-x-4">
                    <button className="w-full bg-blue-600 text-white p-2 pr-2 rounded">
                        Login
                    </button>
                    <button className="w-full bg-blue-600 text-white p-2 pl-2 rounded">
                        Create
                    </button>
                </div>
            </form>

            {error && <p className="mt-4 text-red-600">{error}</p>}
        </main>
    );
}