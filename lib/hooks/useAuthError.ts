"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Map NextAuth error codes to user-friendly messages
const getErrorMessage = (code: string): string => {
    switch (code) {
        case "OAuthAccountNotLinked":
            return "Este email já possui uma conta cadastrada com senha. Para usar o login com Google, primeiro entre com sua senha e vincule a conta Google nas configurações, ou continue usando email/senha.";
        case "OAuthCallback":
            return "Erro na autenticação com Google. Tente novamente.";
        case "OAuthCreateAccount":
            return "Não foi possível criar a conta com Google. Tente novamente.";
        case "EmailCreateAccount":
            return "Não foi possível criar a conta com este email.";
        case "Callback":
            return "Erro no processo de autenticação. Tente novamente.";
        case "EmailSignin":
            return "Erro ao enviar email de verificação.";
        case "CredentialsSignin":
            return "Email ou senha inválidos.";
        case "SessionRequired":
            return "É necessário fazer login para acessar esta página.";
        default:
            return "Ocorreu um erro na autenticação. Tente novamente.";
    }
};

/**
 * Custom hook for handling NextAuth error codes from URL parameters
 * 
 * @returns Object containing error state and setError function
 */
export function useAuthError() {
    const [error, setError] = useState("");
    const searchParams = useSearchParams();
    const errorCode = searchParams.get("error");

    // Handle URL errors when component mounts or error code changes
    useEffect(() => {
        if (errorCode) {
            setError(getErrorMessage(errorCode));
        }
    }, [errorCode]);

    return {
        error,
        setError,
        clearError: () => setError(""),
        hasError: Boolean(error),
    };
}