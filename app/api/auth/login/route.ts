import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import bcrypt from "bcrypt";
import Coordinator from "@/models/Coordinator";

export async function POST(req: Request) {
    await connectDB();

    const { email, password } = await req.json();

    if(!email || !password) {
        return NextResponse.json(
            { error: "Email and password required" },
            { status: 400 },
        );
    }

    const coordinator = await Coordinator.findOne({ email });

    if(!coordinator) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 },
        );
    }

    const valid = await bcrypt.compare(password, coordinator.passwordHash);

    if(!valid) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { error: 401 },
        );
    }

    const response = NextResponse.json({
        success: true,
        role: coordinator.role,
    });

    response.cookies.set("coordinator_session", coordinator._id.toString(), {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
    });

    return response;
}