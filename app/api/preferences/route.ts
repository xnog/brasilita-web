import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { userProfiles, userProfileRegions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { updateClintContactPreferences } from "@/lib/integrations/clint";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const profile = await db.query.userProfiles.findFirst({
            where: eq(userProfiles.userId, session.user.id),
            with: {
                userProfileRegions: {
                    with: {
                        region: true
                    }
                }
            }
        });

        if (!profile) {
            return NextResponse.json(null);
        }

        // Formatar resposta com regiões
        const profileWithRegions = {
            ...profile,
            regions: profile.userProfileRegions.map(upr => upr.region.id)
        };

        return NextResponse.json(profileWithRegions);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await request.json();

        // Criar o perfil
        const profile = await db.insert(userProfiles).values({
            userId: session.user.id,
            propertyType: data.propertyType,
            location: data.location,
            buyerProfile: data.buyerProfile,
            usageType: data.usageType,
            investmentBudget: data.investmentBudget,
            hasFinancing: data.hasFinancing,
            phone: data.phone,
            investmentGoal: data.investmentGoal,
        }).returning();

        // Inserir regiões se fornecidas
        if (data.regions && data.regions.length > 0) {
            const regionInserts = data.regions.map((regionId: string) => ({
                userProfileId: profile[0].id,
                regionId: regionId
            }));

            await db.insert(userProfileRegions).values(regionInserts);
        }

        // Matching automático foi removido - agora usa filtros dinâmicos

        // Integração com Clint CRM - atualizar preferências do contato
        if (session.user.email) {
            updateClintContactPreferences(session.user.email, {
                propertyType: data.propertyType,
                location: data.location,
                buyerProfile: data.buyerProfile,
                usageType: data.usageType,
                investmentBudget: data.investmentBudget,
                hasFinancing: data.hasFinancing,
                phone: data.phone,
                investmentGoal: data.investmentGoal,
                regions: data.regions
            }).catch(err => {
                console.error('Erro ao atualizar preferências no Clint CRM:', err);
                // Não falha a operação se Clint falhar
            });
        }

        return NextResponse.json({ ...profile[0], regions: data.regions || [] });
    } catch (error) {
        console.error("Error creating user profile:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await request.json();

        // Atualizar o perfil
        const profile = await db.update(userProfiles)
            .set({
                propertyType: data.propertyType,
                location: data.location,
                buyerProfile: data.buyerProfile,
                usageType: data.usageType,
                investmentBudget: data.investmentBudget,
                hasFinancing: data.hasFinancing,
                phone: data.phone,
                investmentGoal: data.investmentGoal,
                updatedAt: new Date(),
            })
            .where(eq(userProfiles.userId, session.user.id))
            .returning();

        if (profile.length === 0) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }

        // Gerenciar regiões - primeiro remover todas as existentes
        await db.delete(userProfileRegions)
            .where(eq(userProfileRegions.userProfileId, profile[0].id));

        // Inserir novas regiões se fornecidas
        if (data.regions && data.regions.length > 0) {
            const regionInserts = data.regions.map((regionId: string) => ({
                userProfileId: profile[0].id,
                regionId: regionId
            }));

            await db.insert(userProfileRegions).values(regionInserts);
        }

        // Matching automático foi removido - agora usa filtros dinâmicos

        // Integração com Clint CRM - atualizar preferências do contato
        if (session.user.email) {
            updateClintContactPreferences(session.user.email, {
                propertyType: data.propertyType,
                location: data.location,
                buyerProfile: data.buyerProfile,
                usageType: data.usageType,
                investmentBudget: data.investmentBudget,
                hasFinancing: data.hasFinancing,
                phone: data.phone,
                investmentGoal: data.investmentGoal,
                regions: data.regions
            }).catch(err => {
                console.error('Erro ao atualizar preferências no Clint CRM:', err);
                // Não falha a operação se Clint falhar
            });
        }

        return NextResponse.json({ ...profile[0], regions: data.regions || [] });
    } catch (error) {
        console.error("Error updating user profile:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
