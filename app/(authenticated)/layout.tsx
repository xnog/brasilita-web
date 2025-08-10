import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AuthenticatedHeader } from "@/components/layout/authenticated-header";

interface AuthenticatedLayoutProps {
    children: React.ReactNode;
}

export default async function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
    const session = await auth();

    if (!session) {
        redirect("/auth/signin");
    }

    return (
        <div className="min-h-screen bg-background">
            <AuthenticatedHeader user={session.user} />
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
