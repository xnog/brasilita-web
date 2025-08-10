import { auth } from "@/lib/auth";
import { PreferencesClient } from "./preferences-client";

export default async function PreferencesPage() {
    const session = await auth();

    return (
        <div className="container mx-auto container-padding py-8">
            <PreferencesClient userId={session.user?.id || ""} />
        </div>
    );
}
