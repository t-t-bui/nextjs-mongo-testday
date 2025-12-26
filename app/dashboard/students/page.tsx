"use client";

import { useEffect, useState } from "react";

type Student = {
    _id: string;
    studentId: string;
    firstName: string;
    lastName: string;
    testName: string;
    checkedIn: boolean;
    room?: {
        name: string;
        location: string;
        testDate: string;
    };
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);

    const toggleCheckIn = async (id: string) => {
        console.log("Toggling student: ", id);

        const res = await fetch(`${BASE_URL}/api/students/${id}/checkin`, {
            method: "PATCH",
        });

        if(!res.ok){
            console.error("Check-in failed");
            return;
        }

        const updatedStudent = await res.json();

        setStudents((prev) =>
            prev.map((s) => (s.studentId === id ? updatedStudent : s))
        );
    };

    useEffect(() => {
        fetch("/api/students")
            .then((res) => res.json())
            .then((data) => {
                setStudents(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading students...</p>;
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Students</h1>

            <div className="overflow-x-auto border rounded">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-left">Student ID</th>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Test</th>
                        <th className="p-3 text-left">Room</th>
                        <th className="p-3 text-left">Check-in</th>
                    </tr>
                    </thead>

                    <tbody>
                    {students.map((student) => (
                        <tr
                            key={student._id}
                            className="border-t hover:bg-gray-50"
                        >
                            <td className="p-3 font-mono">
                                {student.studentId}
                            </td>

                            <td className="p-3">
                                {student.lastName}, {student.firstName}
                            </td>

                            <td className="p-3">{student.testName}</td>

                            <td className="p-3">
                                {student.room ? (
                                    <div>
                                        <div className="font-medium">
                                            {student.room.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {student.room.location}
                                        </div>
                                    </div>
                                ) : (
                                    <span className="text-gray-400">
                      Not Assigned
                    </span>
                                )}
                            </td>

                            <td className="p-3">
                                {student.checkedIn ? (
                                    <span className="text-green-600 font-semibold">
                      ✔ Checked In
                    </span>
                                ) : (
                                    <span className="text-gray-400">
                      Not Checked In
                    </span>
                                )}
                            </td>
                            <td className="p-3">
                                <button
                                    onClick={() => toggleCheckIn(student.studentId)}
                                    className={`px-3 py-1 rounded text-sm font-medium ${
                                        student.checkedIn
                                            ? "bg-green-600 text-white"
                                            : "bg-gray-200 text-gray-700"
                                    }`}
                                >
                                    {student.checkedIn ? "Checked In" : "Check In"}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
