import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import Coordinator from "@/models/Coordinator";

export async function GET(req: Request) {
    await connectDB();

    const cookieHeader = req.headers.get("cookie");
    const sessionId = cookieHeader
        ?.split("; ")
        .find((c) => c.startsWith("coordinator_session="))
        ?.split("=")[1];

    if(!sessionId) {
        return NextResponse.json({ role: null });
    }

    const coordinator = await Coordinator.findById(sessionId).select("role");

    return NextResponse.json({
        role: coordinator?.role ?? null,
    });
}