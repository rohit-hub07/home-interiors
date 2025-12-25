import { dbConnection } from "@/src/db/dbConnection";
import Post from "@/src/model/post.model";
import { NextRequest, NextResponse } from "next/server";


dbConnection();

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    console.log("id inside of delete post route: ", id);

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({
        message: "Post doesn't exist!",
        success: false,
      }, { status: 404 });
    }

    return NextResponse.json({
      message: "Post deleted successfully!",
      success: true,
    }, { status: 200 })

  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    }, { status: 500 })
  }
}
