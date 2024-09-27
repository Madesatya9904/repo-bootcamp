import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import {db} from "../../../lib/db"
import { data } from "autoprefixer";

export const POST = async (req, res) => {
  const formData = await req.formData();
  const files = formData.getAll("files");

  if (!files) {
    return new NextResponse("No files received.", { status: 400 });
  }

  try {
    let images = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + file.name.replaceAll(" ", "_");

      const savedFile = await db.file.create({
        data: {
          filename: filename,
          fileblob: buffer
        }
      })


      images.push(savedFile.filename);
    }
    return NextResponse.json({
      images : images,
  });
  } catch (error) {
    console.log("Error occured ", error);
    return new NextResponse("Internal server Error", { status: 500 });
  }
};