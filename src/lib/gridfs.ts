import { GridFSBucket } from "mongodb";
import clientPromise from "./mongodb";

export async function getGridFSBucket() {
  const client = await clientPromise;

  const db = client.db("smartdrop");

  const bucket = new GridFSBucket(db, {
    bucketName: "files",
  });

  return bucket;
}