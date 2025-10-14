import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrimaryCTAProps {
    href: string;
    children?: React.ReactNode;
    className?: string;
    variant?: "default" | "large";
    icon?: boolean;
}

export function PrimaryCTA({
    href,
    children = "Criar Conta Grátis",
    className,
    variant = "default",
    icon = true
}: PrimaryCTAProps) {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105";

    const variantStyles = {
        default: "px-8 py-3 text-base",
        large: "px-10 py-4 text-lg"
    };

    return (
        <Link
            href={href}
            className={cn(
                baseStyles,
                variantStyles[variant],
                className
            )}
        >
            {children}
            {icon && <ChevronRight className="ml-2 h-5 w-5" />}
        </Link>
    );
}
