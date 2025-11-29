import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users, accounts, userProfiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { SettingsClient } from "./settings-client";

export default async function SettingsPage() {
    const session = await auth();

    // Load user data and account information
    let userHasPassword = false;
    let loginProvider = "email";
    let userInfo = null;
    let emailPreferences = { weeklySuggestions: true };

    try {
        if (session?.user?.id) {
            const [userResult, accountResult, profileResult] = await Promise.all([
                db.query.users.findFirst({
                    where: eq(users.id, session.user.id)
                }),
                db.query.accounts.findFirst({
                    where: eq(accounts.userId, session.user.id)
                }),
                db.query.userProfiles.findFirst({
                    where: eq(userProfiles.userId, session.user.id),
                    columns: {
                        emailPreferences: true,
                    }
                })
            ]);

            userHasPassword = !!(userResult?.password);
            loginProvider = accountResult?.provider || "email";
            userInfo = userResult;

            const prefs = profileResult?.emailPreferences as { weeklySuggestions?: boolean } | null;
            emailPreferences = {
                weeklySuggestions: prefs?.weeklySuggestions ?? true,
            };
        }
    } catch (error) {
        console.log("Error loading user data:", error);
    }

    return (
        <div className="container mx-auto container-padding py-8">
            <SettingsClient
                userHasPassword={userHasPassword}
                loginProvider={loginProvider}
                userInfo={userInfo || null}
                emailPreferences={emailPreferences}
            />
        </div>
    );
}