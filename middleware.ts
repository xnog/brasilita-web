import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const { pathname } = req.nextUrl;

    // Rotas públicas que não precisam de autenticação
    const publicRoutes = [
        "/",
        "/auth/signin",
        "/auth/signup",
        "/api/auth",
    ];

    // Rotas protegidas que precisam de autenticação
    const protectedRoutes = [
        "/dashboard",
        "/profile",
        "/settings",
    ];

    const isPublicRoute = publicRoutes.some(route =>
        pathname.startsWith(route) || pathname === route
    );

    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Se for rota de API de auth, permitir
    if (pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    // Se for rota pública, permitir
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // Se for rota protegida e não estiver logado, redirecionar para login
    if (isProtectedRoute && !req.auth) {
        const signInUrl = new URL("/auth/signin", req.url);
        signInUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(signInUrl);
    }

    // Se estiver logado e tentando acessar página de login, redirecionar para dashboard
    if (req.auth && (pathname === "/auth/signin" || pathname === "/auth/signup")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (public folder)
         */
        "/((?!_next/static|_next/image|favicon.ico|public|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};