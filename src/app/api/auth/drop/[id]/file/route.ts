import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { Readable } from "stream";
import clientPromise from "@/lib/mongodb";
import redis from "@/lib/redis";
import { getGridFSBucket } from "@/lib/gridfs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    //Check Redis access
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

    //MongoDB
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

    //Check expiry
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

    //Validate fileId
    if (!drop.fileId) {
      return NextResponse.json(
        {
          success: false,
          message: "File not found.",
        },
        { status: 404 },
      );
    }

    const fileId =
      drop.fileId instanceof ObjectId ? drop.fileId : new ObjectId(drop.fileId);

    //Get GridFS bucket
    const bucket = await getGridFSBucket();

    //Get file information
    const files = await db.collection("files.files").findOne({
      _id: fileId,
    });

    if (!files) {
      return NextResponse.json(
        {
          success: false,
          message: "File not found.",
        },
        { status: 404 },
      );
    }

    //Open GridFS download stream
    const downloadStream = bucket.openDownloadStream(fileId);
    const { searchParams } = new URL(request.url);
    const download = searchParams.get("download") === "true";

    const disposition = download ? "attachment" : "inline";

    // Convert Node stream to Web stream
    const webStream = Readable.toWeb(downloadStream) as ReadableStream;

    //Return actual file
    return new Response(webStream, {
      status: 200,
      headers: {
        "Content-Type":
          files.metadata?.contentType || "application/octet-stream",

        "Content-Disposition": `${disposition}; filename="${files.filename}"`,

        "Cache-Control": "private, no-store",
      },
    });
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
