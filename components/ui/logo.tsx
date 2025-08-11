import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size = 24 }: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="Brasilità Logo"
      width={size}
      height={size}
      className={cn("", className)}
    />
  );
}