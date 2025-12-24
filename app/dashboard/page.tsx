"use client"

import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const DashboardPage = () => {
    const router = useRouter();

    const logout = async () => {
        await fetch(`${ BASE_URL }/api/logout`, { method: "POST" });
        router.push("/login");
    };

    return (
        <main className="p-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Testing Coordinator Dashboard</h1>
                <button
                    onClick={logout}
                    className="bg-red-600 text-white px-4 py-2 rounded">
                    Logout
                </button>
            </div>
            <p className="mt-4 text-gray-600">
                Manage testing rooms, students, and check-ins.
            </p>
        </main>
    );
}
export default DashboardPage;
