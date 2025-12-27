import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/src/lib/cloudinary";
import { dbConnection } from "@/src/db/dbConnection";

dbConnection();
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided!", success: false },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "homedesign",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    }) as any;

    console.log("result inside of the upload-media: ", result);


    return NextResponse.json(
      {
        message: "File uploaded successfully!",
        success: true,
        mediaUrl: result.secure_url,
        mediaType: result.resource_type,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to upload file", success: false },
      { status: 500 }
    );
  }
}
