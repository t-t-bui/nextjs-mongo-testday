import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { parse } from "csv-parse/sync";

import Students from "@/models/Students";

export async function POST(req: Request) {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if(!file) {
        return NextResponse.json(
            { error: "CSV file required." },
            { status: 400 },
        );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const text = buffer.toString("utf-8");

    let records;
    try {
        records = parse(text, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
        });
    } catch {
        return NextResponse.json(
            { error: "CSV file parsed." },
            { status: 400 },
        );
    }

    const operations = [];

    for (const row of records) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const {studentId, firstName, lastName, testName} = row;

        if (!studentId || !firstName || !lastName || !testName) {
            continue;
        }

        operations.push({
            updateOne: {
                filter: {studentId},
                update: {
                    $set: {
                        studentId,
                        firstName,
                        lastName,
                        testName,
                    },
                },
                upsert: true,
            },
        });
    }

    if(operations.length === 0) {
        return NextResponse.json(
            { error: "No valid student records found." },
            { status: 400 },
        )
    }

    await Students.bulkWrite(operations);

    return NextResponse.json({
        success: true,
        imported: operations.length,
    });
}
