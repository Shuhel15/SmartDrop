import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import redis from "@/lib/redis";

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and OTP are required",
        },
        { status: 400 },
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedOtp = String(otp).trim();

    //OTP attempt verification logic
    const attemptsKey = `otp_attempts:${normalizedEmail}`;
    const attempts = Number(await redis.get(attemptsKey)) || 0;

    if (attempts >= 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many incorrect attempts. Please request a new OTP.",
        },
        { status: 429 },
      );
    }

    //Get the OTP from Redis
    const storedOTP = await redis.get(`otp:${normalizedEmail}`);

    if (!storedOTP) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP has expired or is invalid",
        },
        { status: 400 },
      );
    }

    //Compare the provided OTP with the stored OTP
    if (storedOTP !== normalizedOtp) {
      const newAttempts = await redis.incr(attemptsKey);
      if (newAttempts === 1) {
        await redis.expire(attemptsKey, 300); // Set expiration for attempts key to 5 minutes
      }
      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP",
          attemptsRemaining: Math.max(0, 5 - newAttempts),
        },
        { status: 400 },
      );
    }

    //Update the user's emailVerified status in the database
    const client = await clientPromise;
    const db = client.db("smartdrop");

    const result = await db.collection("users").updateOne(
      { email:normalizedEmail },
      {
        $set: {
          emailVerified: true,
          updatedAt: new Date(),
        },
      },
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to verify email",
        },
        { status: 500 },
      );
    }

    //Delete the OTP from Redis after successful verification
    await redis.del(`otp:${normalizedEmail}`);
    await redis.del(`otp_attempts:${normalizedEmail}`);

    return NextResponse.json(
      {
        success: true,
        message: "Email verified successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while verifying the OTP",
      },
      { status: 500 },
    );
  }
}
