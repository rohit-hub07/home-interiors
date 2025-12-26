import { NextRequest, NextResponse } from "next/server";
import Post from "@/src/model/post.model";
import { dbConnection } from "@/src/db/dbConnection";

dbConnection();
export async function POST(request: NextRequest) {
  try {
    const { title, mediaUrl, mediaType, category } = await request.json();

    if (!title || !mediaUrl || !mediaType || !category) {
      return NextResponse.json(
        { message: "All fields are required!", success: false },
        { status: 400 }
      );
    }

    const post = await Post.create({
      title,
      mediaUrl,
      mediaType,
      category,
    });

    if(!post){
      return NextResponse.json({
        message: "Something went wrong!",
        success: false,
      },{status: 500})
    }

    return NextResponse.json(
      {
        message: "Post created successfully!",
        success: true,
        post,
      },
      { status: 201 }
    );

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}
