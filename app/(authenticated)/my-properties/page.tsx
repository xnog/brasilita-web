import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MyPropertiesClient } from "./my-properties-client";

export default async function MyPropertiesPage() {
    const session = await auth();
    if (!session) {
        redirect("/auth/signin");
    }

    return <MyPropertiesClient />;
}

