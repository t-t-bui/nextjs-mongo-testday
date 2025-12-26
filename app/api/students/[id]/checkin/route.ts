import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import Students from "@/models/Students";

export async function PATCH(req: Request, context: { params: { id: string } }) {
    await connectDB();

    const { id } = await context.params;

    console.log("PARAM ID:", id);
    if(!id) {
        return NextResponse.json(
            {error: "Student ID missing."},
            {status: 404},
        );
    }

    const student = await Students.findOne({ studentId: id });

    if(!student) {
        return NextResponse.json(
            {error: "Student does not exist."},
            { status: 404 },
        )
    }


    student.checkedIn = !student.checkedIn;
    await student.save();

    return NextResponse.json(student);
}