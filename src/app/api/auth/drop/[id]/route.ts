import { NextResponse } from "next/server";
import redis from "@/lib/redis";
import clientPromise from "@/lib/mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid url",
        },
        { status: 400 },
      );
    }

    //Checking in the redis cache first
    const cachedDrop = await redis.get(`drop:${id}`);

    if (!cachedDrop) {
      return NextResponse.json(
        {
          success: false,
          message: "This drop link has expired or does not exist.",
        },
        { status: 404 },
      );
    }

    //Getting actual data from mongoDB

    const client = await clientPromise;
    const db = client.db("smartdrop");

    const drop = await db.collection("drops").findOne(
      { dropId: id },
      {
        projection: {
          _id: 0,
          dropId: 1,
          fileName: 1,
          fileSize: 1,
          expiresAt: 1,
          createdAt: 1,
        },
      },
    );

    if (!drop) {
      return NextResponse.json(
        {
          success: false,
          message: "Drop not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      drop:{
        dropId: drop.dropId,
        fileName: drop.fileName,
        fileSize: drop.fileSize,
        expiresAt: drop.expiresAt,
        createdAt: drop.createdAt,
      }
    },
    { status: 200 },
  )
  } catch (error) {
    console.error("Error fetching drop:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 404 },
    );
  }
}
