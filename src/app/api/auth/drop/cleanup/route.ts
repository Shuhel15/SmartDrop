import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

import clientPromise from "@/lib/mongodb";
import { getGridFSBucket } from "@/lib/gridfs";

async function cleanupExpiredDrops(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const client = await clientPromise;
    const db = client.db("smartdrop");

    const now = new Date();

    const expiredDrops = await db
      .collection("drops")
      .find({
        expiresAt: {
          $lte: now,
        },
      })
      .toArray();

    if (expiredDrops.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No expired drops found.",
        deleted: 0,
      });
    }

    const bucket = await getGridFSBucket();

    let deletedCount = 0;

    for (const drop of expiredDrops) {
      if (drop.fileId) {
        try {
          const fileId =
            drop.fileId instanceof ObjectId
              ? drop.fileId
              : new ObjectId(drop.fileId);

          await bucket.delete(fileId);
        } catch (error) {
          console.error(
            `Failed to delete file for ${drop.dropId}:`,
            error,
          );
        }
      }

      await db.collection("drops").deleteOne({
        _id: drop._id,
      });

      deletedCount++;
    }

    return NextResponse.json({
      success: true,
      message: "Expired drops cleaned successfully.",
      deleted: deletedCount,
    });
  } catch (error) {
    console.error("Cleanup error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to clean expired drops.",
      },
      { status: 500 },
    );
  }
}

// GET → Vercel Cron 
export async function GET(request: Request) {
  return cleanupExpiredDrops(request);
}

// DELETE → manually test 
export async function DELETE(request: Request) {
  return cleanupExpiredDrops(request);
}