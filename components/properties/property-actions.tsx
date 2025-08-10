"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, X, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyActionsProps {
    propertyId: string;
    currentStatus?: "interested" | "rejected" | null;
    onStatusChange: (propertyId: string, status: "interested" | "rejected") => Promise<void>;
    onViewDetails?: (propertyId: string) => void;
    isLoading?: boolean;
}

export function PropertyActions({
    propertyId,
    currentStatus,
    onStatusChange,
    onViewDetails,
    isLoading = false
}: PropertyActionsProps) {
    const [localLoading, setLocalLoading] = useState<"interested" | "rejected" | null>(null);

    const handleStatusChange = async (status: "interested" | "rejected") => {
        if (currentStatus === status) return; // Don't change if already this status
        
        setLocalLoading(status);
        try {
            await onStatusChange(propertyId, status);
        } catch (error) {
            console.error("Error updating property status:", error);
        } finally {
            setLocalLoading(null);
        }
    };

    const isInterested = currentStatus === "interested";
    const isRejected = currentStatus === "rejected";

    return (
        <div className="flex gap-2 items-center">
            {/* Interest Button */}
            <Button
                variant={isInterested ? "default" : "outline"}
                size="sm"
                onClick={() => handleStatusChange("interested")}
                disabled={isLoading || localLoading === "interested" || isRejected}
                className={cn(
                    "flex items-center gap-2",
                    isInterested && "bg-green-600 hover:bg-green-700 text-white",
                    isRejected && "opacity-50 cursor-not-allowed"
                )}
            >
                {localLoading === "interested" ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                ) : (
                    <Heart className={cn("h-4 w-4", isInterested && "fill-current")} />
                )}
                {isInterested ? "Com Interesse" : "Tenho Interesse"}
            </Button>

            {/* Reject Button */}
            {!isInterested && (
                <Button
                    variant={isRejected ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => handleStatusChange("rejected")}
                    disabled={isLoading || localLoading === "rejected"}
                    className={cn(
                        "flex items-center gap-2 text-muted-foreground",
                        isRejected && "bg-gray-100 text-gray-600"
                    )}
                >
                    {localLoading === "rejected" ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                    ) : (
                        <X className="h-4 w-4" />
                    )}
                    {isRejected ? "Rejeitado" : "Não me Interessa"}
                </Button>
            )}

            {/* View Details Button */}
            {onViewDetails && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(propertyId)}
                    className="flex items-center gap-2"
                >
                    <Eye className="h-4 w-4" />
                    Ver Detalhes
                </Button>
            )}
        </div>
    );
}
