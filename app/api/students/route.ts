import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import Students from "@/models/Students";
import "@/models/TestingRoom";

export async function GET() {
    await connectDB();

    const students = await Students.find()
        .populate({
            path: "room",
            select: "name location testName testDate",
        }).sort({ lastName: 1, firstName: 1 });

    return NextResponse.json(students);
}