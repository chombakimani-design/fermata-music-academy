import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;

    if (
        path === "/admin/login" ||
        path === "/auth/login" ||
        path === "/tutor/login"
    ) {
        return NextResponse.next();
    }

    let response = NextResponse.next({
        request,
    });

    const supabase = createServerClient(

        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

        {
            cookies: {

                getAll() {
                    return request.cookies.getAll();
                },

                setAll(cookiesToSet) {

                    cookiesToSet.forEach(({ name, value }) => {
                        request.cookies.set(name, value);
                    });

                    response = NextResponse.next({
                        request,
                    });

                    cookiesToSet.forEach(({ name, value, options }) => {
                        response.cookies.set(name, value, options);
                    });

                }

            }

        }

    );

    const {
        data: {
            user
        }
    } = await supabase.auth.getUser();

    if (!user) {

        if (path.startsWith("/admin")) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        if (path.startsWith("/student")) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

        if (path.startsWith("/tutor")) {
            return NextResponse.redirect(new URL("/tutor/login", request.url));
        }

    }

    return response;

}

export const config = {

    matcher: [

        "/admin/:path*",
        "/student/:path*",
        "/tutor/:path*"

    ]

};
