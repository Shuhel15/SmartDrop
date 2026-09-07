import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import redis from "@/lib/redis";
import { generateOTP } from "@/lib/otp";
import { sendOTPEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const normalizedEmail = email.trim().toLowerCase();

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, and password are required",
        },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("smartdrop");

    //Checking if the user already exists
    const existingUser = await db.collection("users").findOne({ normalizedEmail });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user object
    const user = {
      name,
      email:normalizedEmail,
      password: hashedPassword,
      emailVerified: false,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert the new user object into the users collection
    await db.collection("users").insertOne(user);

    //Generate OTP and store it in Redis with a 5-minute expiration
    const otp = generateOTP();
    await redis.set(`otp:${normalizedEmail}`, otp, "EX", 300);
    await sendOTPEmail(normalizedEmail, otp);

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully. OTP sent to your email for verification. Please check your inbox or spam folder.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error registering user:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while registering the user",
      },
      { status: 500 },
    );
  }
}
