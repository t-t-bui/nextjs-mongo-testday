import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import Students from "@/models/Students";
import TestingRoom from "@/models/TestingRoom";
import Coordinator from "@/models/Coordinator";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Seeding disabled in production" },
      { status: 403 }
    );
  }

  await connectDB();

  // Clear existing data
  await Students.deleteMany({});
  await TestingRoom.deleteMany({});
  await Coordinator.deleteMany({});

  // Create coordinator
  const passwordHash = "password123";

  const coordinator = await Coordinator.create({
    firstName: "Testing",
    lastName: "Coordinator",
    email: "coordinator@testday.edu",
    passwordHash,
    role: "admin",
  });

  // Create testing room
  const satRoom = await TestingRoom.create({
    name: "Room A113",
    location: "Main Building, 1st Floor, A Hall",
    testName: "SAT",
    testDate: "12-25-2025",
    capacity: 30,
  });

  // Create students
  const students = await Students.insertMany([
    {
      studentId: "S1001",
      firstName: "Brock",
      lastName: "Lee",
      testName: "SAT",
      room: satRoom._id,
    },
    {
      studentId: "S1002",
      firstName: "Carrot",
      lastName: "Top",
      testName: "SAT",
      room: satRoom._id,
    },
  ]);

  return NextResponse.json({
    message: "Database seeded successfully",
    Coordinator
  });
}
