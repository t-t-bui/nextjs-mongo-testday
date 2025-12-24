import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function StudentPage({
											  params,
										  }: {
	params: { id: string };
}) {
	const res = await fetch(`${ BASE_URL }/api/students/${(await params).id}`, {
		cache: "no-store",
	});

	if (!res.ok) return notFound();

	const student = await res.json();

	return (
		<main className="max-w-2xl mx-auto p-8">
			<h1 className="text-2xl font-bold">
				{student.firstName} {student.lastName}
			</h1>

			<p className="text-gray-600">
				Student ID: {student.studentId}
			</p>

			<p className="mt-4 font-semibold">
				Test: {student.testName}
			</p>

			{student.room ? (
				<div className="mt-4 border rounded p-4">
					<p>Room: {student.room.location}</p>
					<p>
						Date: {new Date(student.room.testDate).toLocaleDateString()}
					</p>
					<p>Test Type: {student.room.testName}</p>
				</div>
			) : (
				<p className="mt-4 text-gray-500">
					No room assigned yet.
				</p>
			)}

			<p className="mt-4">
				Checked In: {student.checkedIn ? "Yes" : "No"}
			</p>
		</main>
	);
}
