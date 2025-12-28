import User from "@/src/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { dbConnection } from "@/src/db/dbConnection";

dotenv.config();

interface loginType {
  email: string,
  password: string,
}

dbConnection()
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password }: loginType = reqBody;
    if (!email || !password) {
      return NextResponse.json({
        message: "All fields are required!",
        success: false
      }, { status: 400 })
    }

    const user = await User.findOne({email});

    if(!user){
      return NextResponse.json({
        message: "User doesn't exist!",
        success: false,
      },{status: 404})
    }
    
    const tokenData = {
      id: user._id,
      email: user.email
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET as string, {expiresIn: '1d'})


    const response = NextResponse.json({
      message: "User logged in successfully",
      success: true,
    },{status: 200})

    response.cookies.set("token", token,{
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 3
    })

    return response;

  } catch (error: any) {
    NextResponse.json({
      message: error.message,
      success: false,
    },{status: 500})
  }
}