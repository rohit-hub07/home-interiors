import { NextRequest, NextResponse } from "next/server";
import { dbConnection } from "@/src/db/dbConnection";

import Banner from "@/src/model/banner.model";
import { getDataFromJwt } from "@/src/utilities/getDataFromJwt";

export async function POST(req: NextRequest) {
  try {
    // Check if user is authenticated
    const userId = await getDataFromJwt(req);

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized. Please login to update banner."
      }, { status: 401 });
    }

    await dbConnection();

    const body = await req.json();
    const {
      title,
      subtitle,
      discountText,
      discountSubtext,
      validityDate,
      termsText,
      buttonText,
      whatsappNumber
    } = body;

    // Find existing banner or create new one
    let banner = await Banner.findOne();

    if (banner) {
      // Update existing banner
      banner.title = title || banner.title;
      banner.subtitle = subtitle || banner.subtitle;
      banner.discountText = discountText || banner.discountText;
      banner.discountSubtext = discountSubtext || banner.discountSubtext;
      banner.validityDate = validityDate || banner.validityDate;
      banner.termsText = termsText || banner.termsText;
      banner.buttonText = buttonText || banner.buttonText;
      banner.whatsappNumber = whatsappNumber || banner.whatsappNumber;
      banner.updatedAt = new Date();

      await banner.save();
    } else {
      // Create new banner with provided data
      banner = await Banner.create(body);
    }

    return NextResponse.json({
      success: true,
      message: "Banner updated successfully",
      data: banner
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || "Failed to update banner"
    }, { status: 500 });
  }
}
