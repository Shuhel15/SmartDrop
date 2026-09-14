import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import clientPromise from "@/lib/mongodb";
import redis from "@/lib/redis";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        {
          success: false,
          message: "Password is required",
        },
        { status: 400 },
      );
    }

    // Redis keys
    const attemptsKey = `drop_attempts:${id}`;
    const accessKey = `drop_access:${id}`;

    // Check previous attempts
    const attempts =
      Number(await redis.get(attemptsKey)) || 0;

    if (attempts >= 5) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many incorrect attempts. Please try again later.",
          attemptsRemaining: 0,
        },
        { status: 429 },
      );
    }

    // Get drop from MongoDB
    const client = await clientPromise;
    const db = client.db("smartdrop");

    const drop = await db.collection("drops").findOne({
      dropId: id,
    });

    if (!drop) {
      return NextResponse.json(
        {
          success: false,
          message: "Drop not found.",
        },
        { status: 404 },
      );
    }

    // Check expiry
    if (
      drop.expiresAt &&
      new Date(drop.expiresAt).getTime() <= Date.now()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "This drop has expired.",
        },
        { status: 410 },
      );
    }

    // Compare password
    const isValid = await bcrypt.compare(
      password,
      drop.passwordHash,
    );

    if (!isValid) {
      const newAttempts =
        await redis.incr(attemptsKey);

      // Attempts expire after 5 minutes
      if (newAttempts === 1) {
        await redis.expire(attemptsKey, 300);
      }

      return NextResponse.json(
        {
          success: false,
          message: "Incorrect password.",
          attemptsRemaining: Math.max(
            0,
            5 - newAttempts,
          ),
        },
        { status: 401 },
      );
    }

    // Successful verification
    await redis.set(
      accessKey,
      "true",
      "EX",
      900,
    );

    // Reset failed attempts
    await redis.del(attemptsKey);

    return NextResponse.json(
      {
        success: true,
        message: "Password verified successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "Error verifying drop password:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while verifying the password.",
      },
      { status: 500 },
    );
  }
}