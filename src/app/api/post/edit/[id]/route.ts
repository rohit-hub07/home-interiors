import { dbConnection } from "@/src/db/dbConnection";
import Post from "@/src/model/post.model";
import { NextRequest, NextResponse } from "next/server";


dbConnection();
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const reqBody = await request.json();
    const { title, imageUrl } = reqBody;

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({
        message: "Post doesn't exist!",
        success: false,
      }, { status: 404 })
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title: title || post.title,
        imageUrl: imageUrl || post.imageUrl,
      },
      { new: true }
    );

    return NextResponse.json({
      message: "Post updated successfully!",
      success: true,
      data: updatedPost,
    }, { status: 200 })

  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    }, { status: 500 })
  }
}