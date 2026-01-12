import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
    {/*    Hero Section     */}
        <section className="flex-1 flex items-center justify-center px-6">
            <div className="max-w-4xl text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Secure Student Testing Management
                </h1>

                <p className="text-lg text-gray-600 mb-8">
                    A simple, compliant platform for managing testing rooms, student check-ins, and coordinator worklows.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="/student-lookup"
                        className="py-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">
                        Student Access
                    </a>
                    <a
                        href="/login"
                        className="px-6 py-3 rounded-lg border border-gray-300 text-gray-800 font-medium hover:bg-gray-100">
                        Coordinator Login
                    </a>
                </div>
            </div>
        </section>

    {/*    Features     */}
        <section className="bg-white py-16 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 prounded-xl shadow-sm border">
                    <h3 className="text-xl font-semibold mb-2">
                        Student Check-In
                    </h3>
                    <p className="text-gray-600">
                        Quickly locate student testing assignments using a secure student ID.
                    </p>
                </div>

                <div className="p-6 prounded-xl shadow-sm border">
                    <h3 className="text-xl font-semibold mb-2">
                        Room Management
                    </h3>
                    <p className="text-gray-600">
                        Assign rooms, enforce capacity limits, and track attendance in real time.
                    </p>
                </div>

                <div className="p-6 prounded-xl shadow-sm border">
                    <h3 className="text-xl font-semibold mb-2">
                        Compliance First
                    </h3>
                    <p className="text-gray-600">
                        Designed with FERPA principles in mind - minimal exposure, maximum control.
                    </p>
                </div>
            </div>
        </section>

    {/*    footer   */}
        <footer className="bg-gray-100 py-6 text-center text-sm text-gray-500">
            {new Date().getFullYear()} Testing Management System. All rights reserved.
        </footer>
    </main>
  );
}
