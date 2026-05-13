import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/transactions/:path*",
    "/categories/:path*",
    "/cards/:path*",
    "/recurring/:path*",
    "/settings/:path*"
  ],
};
