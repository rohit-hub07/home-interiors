import { NextRequest, NextResponse } from "next/server";
import {dbConnection} from "@/src/db/dbConnection";
import Banner from "@/src/model/banner.model";

export async function GET() {
  try {
    await dbConnection();

    let banner = await Banner.findOne();

    // If no banner exists, create one with default values
    if (!banner) {
      banner = await Banner.create({});
    }

    return NextResponse.json({
      success: true,
      data: banner
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || "Failed to fetch banner"
    }, { status: 500 });
  }
}
