import { Suspense } from "react";
import { SignInForm } from "@/components/auth/signin-form";
import { Loading } from "@/components/ui/loading";

function SignInFormWithSuspense() {
    return (
        <Suspense fallback={<Loading message="Carregando..." size="sm" />}>
            <SignInForm />
        </Suspense>
    );
}

export default function SignInPage() {
    return <SignInFormWithSuspense />;
}