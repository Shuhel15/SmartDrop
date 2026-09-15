import { NextResponse } from "next/server";
import crypto from "crypto";
import { hashPassword } from "@/lib/password";
import redis from "@/lib/redis";
import clientPromise from "@/lib/mongodb";

const expiryMap: Record<string, number> = {
  "5m": 5 * 60,
  "10m": 10 * 60,
  "20m": 20 * 60,
  "30m": 30 * 60,
  "1h": 60 * 60,
  "6h": 6 * 60 * 60,
  "12h": 12 * 60 * 60,
  "24h": 24 * 60 * 60,
  "3d": 3 * 24 * 60 * 60,
  "7d": 7 * 24 * 60 * 60,
};

export async function POST(request: Request) {
  try {
    // Receive only metadata + Cloudinary URL
    const { fileUrl, publicId, fileName, fileSize, password, expiry } =
      await request.json();

    if (
      !fileUrl ||
      !publicId ||
      !fileName ||
      !fileSize ||
      !password ||
      !expiry
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "File URL, file name, file size, password and expiry are required.",
        },
        { status: 400 },
      );
    }

    if (!expiryMap[expiry]) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid expiry option.",
        },
        { status: 400 },
      );
    }

    // Generate unique drop ID
    const dropId = crypto.randomBytes(6).toString("hex");

    const createdAt = new Date();
    const expirySeconds = expiryMap[expiry];

    const expiresAt = new Date(createdAt.getTime() + expirySeconds * 1000);

    // Hash password
    const passwordHash = await hashPassword(password);

    // MongoDB connection
    const client = await clientPromise;
    const db = client.db("smartdrop");

    // Save drop metadata
    await db.collection("drops").insertOne({
      dropId,
      fileName,
      fileSize,
      fileUrl,
      publicId,
      passwordHash,
      createdAt,
      expiresAt,
    });

    // Redis expiry
    await redis.set(
      `drop:${dropId}`,
      JSON.stringify({
        dropId,
        publicId,
        fileUrl,
        expiresAt,
      }),
      "EX",
      expirySeconds,
    );

    return NextResponse.json(
      {
        success: true,
        message: "Drop created successfully.",
        dropId,
        link: `/drop/${dropId}`,
        expiresAt,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating drop:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 },
    );
  }
}
