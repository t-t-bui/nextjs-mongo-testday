'use client';

import { useState } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const StudentLookupPage = () => {
    const [studentId, setStudentId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [student, setStudent] = useState<any>(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setStudent(null);

        if(!studentId || !firstName || !lastName) {
            setError("Please fill in all fields");
            return;
        }

        try {
            const res = await fetch(`${ BASE_URL }/api/student-lookup`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ studentId, firstName, lastName }),
            });
            const data = await res.json();

            if(!res.ok){
                setError(data.error || "Student not found");
            } else {
                setStudent(data);
            }
        } catch (error) {
            console.error(error);
            setError("Something went wrong");
        }
    };
    return (
        <main className="max-w-lg mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">
                Check Your Testing Room
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Enter Student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full p-2 border rounded"
                    />
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2 border rounded"
                    />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 border rounded"
                />

                <button
                    type="submit"
                    className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Lookup
                </button>
            </form>

            {error && <p className="mt-4 text-red-600">{error}</p> }

            {student && (
                <div className="mt-6 border rounded p-4">
                    <h2 className="font-bold text-xl">
                        {student.firstName} {student.lastName}
                    </h2>

                    <p>Student ID: {student.studentId}</p>
                    <p>Test: {student.testName}</p>
                    {student.room ? (
                        <div className="mt-2">
                            <p>Room: {student.room.name}</p>
                            <p>Locaiton: {student.room.location}</p>
                            <p>Test Date: {student.room.testDate}</p>
                            <p>Capacity: {student.room.capacity}</p>
                        </div>
                    ) : (
                        <p>No room assigned yet.</p>
                    )}
                    <p>Checked In: {student.checkedIn ? "Yes" : "No"}</p>
                </div>
            )}
        </main>
    )
}
export default StudentLookupPage;
