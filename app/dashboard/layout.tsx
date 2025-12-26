"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const DashboardPage = ({ children }: { children: React.ReactNode;}) => {
    const pathname = usePathname();
    const router = useRouter();

    const logout = async () => {
        await fetch(`${ BASE_URL }/api/auth/logout`, { method: "POST" });
        router.push("/login");
    };

    const linkClass = (path: string) =>
        `px-4 py-2 rounded ${
            pathname === path 
                ? "bg-blue-600 text-white" 
                : "text-gray-700 hover:bg-gray-100"
    }`;

    return (
      <div className="min-h-screen">
          <nav className="flex items-center justify-between border-b px-6 py-4">
              <div className="flex gap-2">
                  <Link href="/dashboard" className={linkClass("/dashboard")}>
                      Dashboard
                  </Link>
                  <Link href="/dashboard/students" className={linkClass("/dashboard/students")}>
                      Students
                  </Link>
              </div>

              <button onClick={logout} className="text-red-600 hover:underline">
                  Logout
              </button>
          </nav>

          <main className="p-6">{children}</main>
      </div>
    );
};

export default DashboardPage;