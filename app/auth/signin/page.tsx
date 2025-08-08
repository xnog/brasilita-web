import { Suspense } from "react";
import { SignInForm } from "@/components/auth/signin-form";

function SignInFormWithSuspense() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignInForm />
        </Suspense>
    );
}

export default function SignInPage() {
    return <SignInFormWithSuspense />;
}