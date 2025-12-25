import { dbConnection } from "@/src/db/dbConnection";
import { NextRequest, NextResponse } from "next/server";

dbConnection();
export async function GET(request: NextRequest){
  try {
    const response = NextResponse.json({
      message: "Logout successfully",
      success: true,
    },{status: 200})

    response.cookies.delete("token");

    return response;
    
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false
    }, {status: 500})
  }
}