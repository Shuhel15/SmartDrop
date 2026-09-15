import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST() {
  try {
    const timestamp = Math.round(Date.now() / 1000);

    const signature = crypto
      .createHash("sha1")
      .update(
        `timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`,
      )
      .digest("hex");

    return NextResponse.json({
      timestamp,
      signature,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (error) {
    console.error("Cloudinary signature error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate upload signature.",
      },
      { status: 500 },
    );
  }
}