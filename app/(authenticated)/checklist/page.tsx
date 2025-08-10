import { auth } from "@/lib/auth";
import { ChecklistPageClient } from "./checklist-client";

export default async function ChecklistPage() {
    const session = await auth();

    return (
        <div className="container mx-auto container-padding py-8">
            <ChecklistPageClient userId={session.user?.id || ""} />
        </div>
    );
}