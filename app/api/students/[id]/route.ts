import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Students from "@/models/Students";
import "@/models/TestingRoom";

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	await connectDB();

	const {id: studentId} = await params;

	if (!studentId) {
		return NextResponse.json(
			{ error: "studentId param missing." },
			{ status: 400 }
		);
	}

	// Find the student by studentId (not Mongo _id)
	const student = await Students.findOne({ studentId })
		.populate({
		path: "room",
		select: "name location testName testDate capacity",
	});

	if (!student) {
		return NextResponse.json(
			{ error: "Student not found" },
			{ status: 404 }
		);
	}

	return NextResponse.json(student);
}
