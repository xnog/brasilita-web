"use client";

import { useState, useEffect, useMemo } from "react";
import { PropertyList } from "@/components/properties/property-list";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Heart, BarChart3, RefreshCw } from "lucide-react";

interface PropertiesClientProps {
    userProfile?: {
        location?: string | null;
        investmentBudget?: number | null;
        propertyType?: string | null;
    } | null;
}

export function PropertiesClient({ userProfile }: PropertiesClientProps) {
    const [propertyInterests, setPropertyInterests] = useState<Record<string, "interested" | "rejected">>({});
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    // Convert null values to undefined for compatibility
    const cleanUserProfile = useMemo(() => {
        return userProfile ? {
        location: userProfile.location || undefined,
        investmentBudget: userProfile.investmentBudget || undefined,
        propertyType: userProfile.propertyType || undefined,
    } : undefined;
    }, [userProfile]);

    // Load user interests
    useEffect(() => {
        const loadInterests = async () => {
            try {
                const response = await fetch("/api/properties/interests");
                if (response.ok) {
                    const data = await response.json();
                    setPropertyInterests(data.interests || {});
                }
            } catch (error) {
                console.error("Error loading interests:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadInterests();
    }, []);

    const handleStatusChange = async (propertyId: string, status: "interested" | "rejected") => {
        try {
            const response = await fetch("/api/properties/interests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    propertyId,
                    status,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                
                // Update local state
                setPropertyInterests(prev => ({
                    ...prev,
                    [propertyId]: status
                }));

                // Show success message (you can implement toast notifications)
                console.log(data.message);
                setLastUpdated(new Date());
            }
        } catch (error) {
            console.error("Error updating property status:", error);
        }
    };

    // Calculate stats
    const interestedCount = Object.values(propertyInterests).filter(status => status === "interested").length;
    const rejectedCount = Object.values(propertyInterests).filter(status => status === "rejected").length;

    if (!userProfile) {
        return (
            <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-2 text-xl">
                        <Settings className="h-6 w-6 text-primary" />
                        Configure suas Preferências
                    </CardTitle>
                    <CardDescription>
                        Para ver recomendações personalizadas de imóveis, você precisa configurar suas preferências primeiro
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground">
                        Nossa IA selecionará imóveis ideais baseados em:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Tipo de imóvel desejado</li>
                        <li>• Localização na Itália</li>
                        <li>• Seu orçamento disponível</li>
                        <li>• Perfil de comprador</li>
                        <li>• Tipo de uso pretendido</li>
                    </ul>
                    <Button size="lg" asChild className="mt-6">
                        <a href="/preferences">
                            <Settings className="h-4 w-4 mr-2" />
                            Configurar Preferências
                        </a>
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header with Stats */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">Imóveis Recomendados</h1>
                    <p className="text-sm text-muted-foreground">
                        📍 {userProfile.location} • 
                        💰 Até €{userProfile.investmentBudget?.toLocaleString()} • 
                        🏠 {userProfile.propertyType}
                    </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                    <a href="/preferences">
                        <Settings className="h-4 w-4 mr-2" />
                        Editar Preferências
                    </a>
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <Heart className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium">Interesse</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{interestedCount}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium">Rejeitados</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-600">{rejectedCount}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium">Atualizado</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {lastUpdated.toLocaleTimeString('pt-BR', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                            })}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <Badge variant="outline" className="text-xs">
                            🤖 IA Personalizada
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                            Novos imóveis diariamente
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Property Tabs */}
            <Tabs defaultValue="new" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="new">Novos para Você</TabsTrigger>
                    <TabsTrigger value="interested">
                        Meus Interesses {interestedCount > 0 && `(${interestedCount})`}
                    </TabsTrigger>
                </TabsList>
                
                <TabsContent value="new" className="mt-6">
                    <PropertyList 
                        userProfile={cleanUserProfile}
                        propertyInterests={propertyInterests}
                        onStatusChange={handleStatusChange}
                        showOnlyInterested={false}
                    />
                </TabsContent>
                
                <TabsContent value="interested" className="mt-6">
                    {interestedCount > 0 ? (
                        <PropertyList 
                            userProfile={cleanUserProfile}
                            propertyInterests={propertyInterests}
                            onStatusChange={handleStatusChange}
                            showOnlyInterested={true}
                        />
                    ) : (
                        <Card>
                            <CardContent className="p-8 text-center">
                                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-medium mb-2">Nenhum imóvel de interesse ainda</h3>
                                <p className="text-muted-foreground mb-4">
                                    Explore os imóveis recomendados e marque aqueles que despertam seu interesse
                                </p>
                                <Button variant="outline" onClick={() => {
                                    // Switch to "new" tab
                                    document.querySelector('[value="new"]')?.click();
                                }}>
                                    Ver Recomendações
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
