import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Rotas públicas que não precisam de autenticação
const publicRoutes = [
    "/",
    "/auth/signin",
    "/auth/signup",
    "/api/auth",
    "/privacy-policy",
];

// Rotas com autenticação via API Key (N8N)
const apiKeyRoutes = ["/api/emails"];

export default auth((req) => {
    const { pathname } = req.nextUrl;

    // Verificar se é rota com API Key
    const isApiKeyRoute = apiKeyRoutes.some(route => pathname.startsWith(route));

    if (isApiKeyRoute) {
        const apiKey = req.headers.get("x-api-key");

        if (apiKey && apiKey === process.env.EMAIL_API_SECRET_KEY) {
            return NextResponse.next();
        }

        // Se não tiver API Key válida, retorna 401
        return NextResponse.json(
            { error: "Unauthorized - Invalid or missing API key" },
            { status: 401 }
        );
    }

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