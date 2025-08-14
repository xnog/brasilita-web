import { PreferencesClient } from "./preferences-client";

export default async function PreferencesPage() {
    return (
        <div className="container mx-auto container-padding py-8">
            <PreferencesClient />
        </div>
    );
}
