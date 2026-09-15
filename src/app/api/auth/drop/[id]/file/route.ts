import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

import redis from "@/lib/redis";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Check Redis access
    const hasAccess = await redis.get(`drop_access:${id}`);

    if (!hasAccess) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied. Please verify the password first.",
        },
        { status: 401 },
      );
    }

    // MongoDB
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
    if (drop.expiresAt && new Date(drop.expiresAt).getTime() <= Date.now()) {
      await redis.del(`drop_access:${id}`);

      return NextResponse.json(
        {
          success: false,
          message: "This drop has expired.",
        },
        { status: 410 },
      );
    }

    // Validate Cloudinary URL
    if (!drop.fileUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "File not found.",
        },
        { status: 404 },
      );
    }

    const { searchParams } = new URL(request.url);

    const download = searchParams.get("download") === "true";


    // Download mode
    if (download) {
      const response = await fetch(drop.fileUrl);

      if (!response.ok) {
        return NextResponse.json(
          {
            success: false,
            message: "Failed to fetch file from Cloudinary.",
          },
          { status: 500 },
        );
      }

      const fileBuffer = await response.arrayBuffer();

      return new Response(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type":
            response.headers.get("content-type") || "application/octet-stream",
          "Content-Disposition": `attachment; filename="${drop.fileName}"`,
          "Cache-Control": "private, no-store",
        },
      });
    }

    return NextResponse.redirect(drop.fileUrl);
  } catch (error) {
    console.error("File access error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to access file.",
      },
      { status: 500 },
    );
  }
}
