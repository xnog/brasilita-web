"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface LandingHeaderProps {
    session?: {
        user?: {
            id?: string;
            name?: string | null;
            email?: string | null;
        };
    } | null;
}

const navigationItems = [
    {
        name: "Sobre",
        href: "/about",
    },
    {
        name: "FAQ",
        href: "/faq",
    },
    {
        name: "Contato",
        href: "/contact",
    },
];

export function LandingHeader({ session }: LandingHeaderProps) {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="w-full container-padding flex h-14 items-center">
                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pr-0 pt-6">
                        <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
                        <div className="px-6 pb-4">
                            <Link
                                href="/"
                                className="flex items-center space-x-2"
                            >
                                <Logo className="h-6 w-6" size={24} />
                                <span className="font-bold">Brasilità</span>
                            </Link>
                        </div>
                        <div className="px-6 pb-10">
                            <div className="flex flex-col space-y-3">
                                <Link
                                    href="/"
                                    className={cn(
                                        "transition-colors hover:text-foreground/80",
                                        pathname === "/" ? "text-foreground" : "text-foreground/60"
                                    )}
                                >
                                    Início
                                </Link>
                                {navigationItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "transition-colors hover:text-foreground/80",
                                                isActive ? "text-foreground" : "text-foreground/60"
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                })}
                                {!session && (
                                    <Link
                                        href="/auth/signin"
                                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                                    >
                                        Entrar
                                    </Link>
                                )}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>

                {/* Mobile Logo - visible only on mobile */}
                <div className="flex flex-1 items-center lg:hidden">
                    <Link href="/" className="flex items-center space-x-2">
                        <Logo className="h-6 w-6" size={24} />
                        <span className="font-bold">Brasilità</span>
                    </Link>
                </div>

                {/* Left side - Logo and Navigation */}
                <div className="hidden lg:flex items-center">
                    {/* Logo */}
                    <div className="mr-6">
                        <Link href="/" className="flex items-center space-x-2">
                            <Logo className="h-6 w-6" size={24} />
                            <span className="hidden font-bold sm:inline-block">
                                Brasilità
                            </span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex items-center space-x-5 text-sm font-medium">
                        <Link
                            href="/"
                            className={cn(
                                "transition-colors hover:text-foreground/80",
                                pathname === "/" ? "text-foreground" : "text-foreground/60"
                            )}
                        >
                            Início
                        </Link>
                        {navigationItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "transition-colors hover:text-foreground/80",
                                        isActive ? "text-foreground" : "text-foreground/60"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Right side - Auth buttons only */}
                <div className="flex items-center justify-end lg:flex-1">

                    {/* Auth buttons - Same spacing as navigation items */}
                    {session ? (
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                            Minha Área
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/auth/signin"
                                className="transition-colors hover:text-foreground/80 text-foreground/60 text-sm font-medium mr-6"
                            >
                                Entrar
                            </Link>
                            <Link
                                href="/auth/signup"
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black h-10 px-4 py-2"
                            >
                                Criar Conta Grátis
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
