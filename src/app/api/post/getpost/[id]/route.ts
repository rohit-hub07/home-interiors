import Post from "@/src/model/post.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }){
  try {
    const {id} = await params;
    if(!id){
      return NextResponse.json({
        message: "Post id is not valid!",
        success: false,
      },{status: 400})
    } 
    
    const post = await Post.findById(id);
    if(!post){
      return NextResponse.json({
        message: "Post doesn't exist!",
        success: false,
      },{status: 404})
    }

    return NextResponse.json({
      message: "Post fetched successfully!",
      success: true,
      post: post
    },{status: 200})

  } catch (error: any) {
    console.log("Error inside of getPost route: ", error.message);
    return NextResponse.json({
      message: error.message,
      success: false,
    },{status: 500})
  }
}