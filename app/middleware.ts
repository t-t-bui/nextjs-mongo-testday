import { NextResponse } from "next/server";
import type { NextRequest} from "next/server";

export function middleware(req: NextRequest) {
    const session = req.cookies.get("coordinator_session");

    if(!session && req.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
