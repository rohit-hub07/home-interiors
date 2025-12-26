import { dbConnection } from "@/src/db/dbConnection";
import Post from "@/src/model/post.model";
import { NextRequest, NextResponse } from "next/server";


dbConnection();
export async function GET(req: NextRequest, { params }: { params: { category: string } }) {
  try {
    const category = await params.category;
    console.log("category: ", category);
    if (!category) return NextResponse.json({ message: "Category is missing!", success: false }, { status: 404 });

    const Posts = await Post.find({ category });

    if (!Posts) return NextResponse.json({
      message: "There is no post of this Category",
      success: false,
    }, { status: 404 })

    return NextResponse.json({
      message: "Posts fetched successfully!",
      success: true,
      posts: Posts,
    }, { status: 200 })

  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    }, { status: 500 })
  }
}