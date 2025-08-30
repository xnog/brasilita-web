"use client";

import { useEffect, useRef, Suspense } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Property } from "@/lib/db/schema";
import { PropertyDetailContent } from "./property-detail-content";
import { PageLoading } from "@/components/ui/page-loading";

interface PropertyDetailModalProps {
    property: Omit<Property, 'originalUrl'> & {
        isInterested?: boolean;
        region?: { id: string; name: string; examples: string | null; createdAt: Date | null; updatedAt: Date | null; } | null;
    };
    isOpen: boolean;
    onClose: () => void;
    onToggleInterest: (propertyId: string, isInterested: boolean) => void;
}

export function PropertyDetailModal({
    property,
    isOpen,
    onClose,
    onToggleInterest
}: PropertyDetailModalProps) {
    const originalUrlRef = useRef<string>('');

    // Handle URL changes and browser back button
    useEffect(() => {
        const handleBackButton = () => {
            if (isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            // Store original URL when opening modal, but ensure it's the properties page
            const currentUrl = window.location.href;
            originalUrlRef.current = currentUrl.includes('/properties/') ?
                currentUrl.split('/properties/')[0] + '/properties' :
                currentUrl;

            // Update URL to property detail page without navigating
            const newUrl = `/properties/${property.id}`;
            window.history.pushState({ modalOpen: true }, '', newUrl);

            // Listen for back button
            window.addEventListener('popstate', handleBackButton);
        } else if (originalUrlRef.current) {
            // Restore original URL when modal closes
            window.history.replaceState(null, '', originalUrlRef.current);
            originalUrlRef.current = '';
        }

        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [isOpen, onClose, property.id]);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent
                className="max-w-none w-full h-full sm:max-w-7xl sm:w-[95vw] sm:h-[95vh] p-0 gap-0 flex flex-col [&>button]:hidden z-[9999]"
                style={{ zIndex: 9999 }}
            >
                <VisuallyHidden>
                    <DialogTitle>{property.title}</DialogTitle>
                </VisuallyHidden>

                <div className="flex-1 overflow-auto relative">
                    <Suspense fallback={
                        <div className="flex items-center justify-center h-full">
                            <PageLoading />
                        </div>
                    }>
                        <PropertyDetailContent
                            property={property}
                            onToggleInterest={onToggleInterest}
                            showCloseButton={true}
                            onClose={onClose}
                        />
                    </Suspense>
                </div>
            </DialogContent>
            <style jsx global>{`
                [data-radix-popper-content-wrapper] {
                    z-index: 9999 !important;
                }
                [data-radix-dialog-overlay] {
                    z-index: 9998 !important;
                }
                [data-radix-dialog-content] {
                    z-index: 9999 !important;
                }
            `}</style>
        </Dialog>
    );
}
