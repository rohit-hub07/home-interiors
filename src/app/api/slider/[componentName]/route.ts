import { NextRequest, NextResponse } from "next/server";
import { dbConnection } from "@/src/db/dbConnection";
import Slider from "@/src/model/slider.model";

export async function GET(req: NextRequest, { params }: { params: Promise<{ componentName: string }> }) {
  try {
    await dbConnection();
    const { componentName } = await params;

    const slider = await Slider.findOne({ componentName });

    if (!slider) {
      return NextResponse.json({
        success: false,
        message: "Slider not found"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: slider.slides
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ componentName: string }> }) {
  try {
    await dbConnection();
    const { componentName } = await params;
    const { slides } = await req.json();

    if (!slides || !Array.isArray(slides)) {
      return NextResponse.json({
        success: false,
        message: "Invalid slides data"
      }, { status: 400 });
    }

    // Upsert - update if exists, create if not
    const slider = await Slider.findOneAndUpdate(
      { componentName },
      { componentName, slides },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Slider updated successfully",
      data: slider.slides
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}
