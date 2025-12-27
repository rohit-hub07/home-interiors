import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  console.log("path inside of middleware: ", path);

  // Check if user is trying to access protected routes
  const protectedPath = path.includes("/upload") || path.includes("/delete") || path.includes("/edit");

  const token = request.cookies.get('token')?.value || '';

  // If accessing protected route without token, redirect to home
  if (protectedPath && !token) {
    return NextResponse.json({
      message: "You are not allowed to access this route!",
      success: false,
    },{status: 403});
  }

  // Allow the request to continue
  return NextResponse.next();
}

interface MiddlewareConfig {
  matcher: string[];
}

export const config: MiddlewareConfig = {
  matcher: [
    "/api/post/upload",
    "/api/post/delete/:path*",
    "/api/post/edit/:path*",
    "/upload-design",
    "/delete/:path*"
  ]
}