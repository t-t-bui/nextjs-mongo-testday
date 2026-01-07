"use client"

import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const DashboardPage = () => {
    const router = useRouter();

    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");

    const[role, setRole] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/auth/me")
            .then((res) => res.json())
            .then((data) => setRole(data.role));
    })

    const uploadCSV = async () => {
        if(!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(`${ BASE_URL }/api/students/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if(!res.ok) {
            setMessage(data.error);
            return;
        }

        setMessage(`✅ Imported ${ data.imported } students`);
    }

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
            <div className="flex items-center justify-between">
                <p className="mt-4 text-gray-600">
                    Manage testing rooms, students, and check-ins.
                </p>
            </div>
            <div className="flex items-center justify-between">
                <div className="border rounded p-4 mb-6 bg-gray-500">
                    <h2 className="font-semibold mb-2">
                        Upload Students (CSV)
                    </h2>

                    <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />

                    <button
                        onClick={uploadCSV}
                        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded">Upload
                    </button>
                </div>
            </div>

            {/*{role === "admin" && <StudentsUpload />}*/}
            {/*{role && role !== "admin" && (*/}
            {/*    <p className="mb-4 text-sm text-gray-500">*/}
            {/*        Only administrators can upload student rosters.*/}
            {/*    </p>*/}
            {/*)}*/}
        </main>
    );
}
export default DashboardPage;
