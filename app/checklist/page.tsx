import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ChecklistPageClient } from "./checklist-client";

export default async function ChecklistPage() {
    const session = await auth();

    if (!session) {
        redirect("/auth/signin");
    }

    return <ChecklistPageClient userId={session.user?.id || ""} />;
}