import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import Students from "@/models/Students";
import TestingRoom from "@/models/TestingRoom";

export async function POST(req: Request) {
    await connectDB();

    const body = await req.json();
    const { studentId, firstName, lastName } = body;

    if(!studentId || !firstName || !lastName) {
        return NextResponse.json(
            { error: "All fields are required." },
            { status: 400 }
        );
    }

    const student = await Students.findOne({
        studentId,
        firstName: { $regex: new RegExp(`^${firstName}$`, "i") },
        lastName: { $regex: new RegExp(`^${lastName}$`, "i") },
    }).populate({
        path: "room",
        select: "name location testName testDate capacity",
    });

    if (!student) {
        return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(student);
}