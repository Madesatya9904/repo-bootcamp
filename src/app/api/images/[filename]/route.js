import { unlink } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { db } from "../../../../lib/db";

export const DELETE = async (req, { params }) => {
  try {
    const file = await db.file.deleteMany({
      where: {
        filename: params.filename
      }
    })
    return new NextResponse("Image has been deleted", { status: 200})
  } catch (error) {
    console.error("Error occurred while deleting file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req, { params }) => {
  try {
    const file = await db.file.findFirst({
      where: {
        filename: params.filename
      }
    })
    if (!file) {
      return new NextResponse("File not found", { status: 404 })
    }
    const buffer = Buffer.from(file.fileblob)
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        // "Content-Type": "image/jpg",
        // "Content-Length": buffer.length
      }
    })
  } catch (error) {
    console.log(error)
    return new NextResponse("internal server error", { status: 500 })
  }
}