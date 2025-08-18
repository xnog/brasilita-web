import Link from "next/link";
import { Logo } from "@/components/ui/logo";

interface LandingHeaderProps {
    session?: {
        user?: {
            id?: string;
            name?: string | null;
            email?: string | null;
        };
    } | null;
}

export function LandingHeader({ session }: LandingHeaderProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="w-full container-padding flex h-14 items-center">
                {/* Logo Section - Same style as authenticated header */}
                <div className="mr-6 flex">
                    <Link href="/" className="flex items-center space-x-2">
                        <Logo className="h-6 w-6" size={24} />
                        <span className="hidden font-bold sm:inline-block">
                            Brasilità
                        </span>
                    </Link>
                </div>

                {/* Right side - Navigation and auth buttons */}
                <div className="flex flex-1 items-center justify-end">
                    {/* Navigation - Same style as authenticated header */}
                    <nav className="hidden lg:flex items-center space-x-5 text-sm font-medium mr-6">
                        <a
                            href="#diferenciais"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Diferenciais
                        </a>
                        <a
                            href="#servicos"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Serviços
                        </a>
                        <a
                            href="#como-funciona"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Como Funciona
                        </a>
                        <a
                            href="#possibilidades"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Possibilidades
                        </a>
                        <a
                            href="#sobre"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Sobre
                        </a>
                        <a
                            href="#contato"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Contato
                        </a>
                    </nav>

                    {/* Auth buttons - Same spacing as navigation items */}
                    {session ? (
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                            Dashboard
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
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                            >
                                Começar
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
