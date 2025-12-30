import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  console.log("path inside of middleware: ", path);

  const protectedPath = path.includes("/upload") || path.includes("/delete") || path.includes("/edit");

  const token = request.cookies.get('token')?.value || '';

  if (protectedPath && !token) {
    return NextResponse.json({
      message: "You are not allowed to access this route!",
      success: false,
    },{status: 403});
  }

  return NextResponse.next();
}

interface MiddlewareConfig {
  matcher: string[];
}

export const config: MiddlewareConfig = {
  matcher: [
    "/api/post/upload",
    "/api/post/upload-media",
    "/api/post/delete/:path*",
    "/api/post/edit/:path*",
    "/upload-design",
    "/delete/:path*"
  ]
}