import { dbConnection } from "@/src/db/dbConnection";
import Post from "@/src/model/post.model";
import { NextRequest, NextResponse } from "next/server";


dbConnection();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, imageUrl } = reqBody;
    if (!title || !imageUrl) {
      return NextResponse.json({
        message: "All fields are required!",
        success: false,
      }, { status: 400 })
    }

    const post = await Post.create({
      title,
      imageUrl
    })

    if(!post){
      return NextResponse.json({
        message: "Something went wrong!",
        success: false
      },{status: 500})
    }

    return NextResponse.json({
      message: "Post created successfully!",
      success: true,
      post: post,
    },{status: 201})
    
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    },{status: 500})
  }
}