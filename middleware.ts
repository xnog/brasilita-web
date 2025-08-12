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
        "/privacy-policy",
    ];

    const isPublicRoute = publicRoutes.some(route =>
        pathname.startsWith(route) || pathname === route
    );

    // Se for rota pública, permitir acesso
    if (isPublicRoute) {
        // Se estiver logado e tentando acessar login/signup, redirecionar para dashboard
        if (req.auth && (pathname === "/auth/signin" || pathname === "/auth/signup")) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        return NextResponse.next();
    }

    // Todas as outras rotas (incluindo APIs) são privadas
    if (!req.auth) {
        const signInUrl = new URL("/auth/signin", req.url);
        signInUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(signInUrl);
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