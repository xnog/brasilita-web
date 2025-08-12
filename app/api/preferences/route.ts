import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { userProfiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth();
        console.log(session);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const profile = await db.query.userProfiles.findFirst({
            where: eq(userProfiles.userId, session.user.id)
        });

        if (!profile) {
            return NextResponse.json(null);
        }

        return NextResponse.json(profile);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();
        console.log(session);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await request.json();

        const profile = await db.insert(userProfiles).values({
            userId: session.user.id,
            propertyType: data.propertyType,
            location: data.location,
            buyerProfile: data.buyerProfile,
            usageType: data.usageType,
            investmentBudget: data.investmentBudget,
            phone: data.phone,
            investmentGoal: data.investmentGoal,
        }).returning();

        return NextResponse.json(profile[0]);
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

        const profile = await db.update(userProfiles)
            .set({
                propertyType: data.propertyType,
                location: data.location,
                buyerProfile: data.buyerProfile,
                usageType: data.usageType,
                investmentBudget: data.investmentBudget,
                phone: data.phone,
                investmentGoal: data.investmentGoal,
                updatedAt: new Date(),
            })
            .where(eq(userProfiles.userId, session.user.id))
            .returning();

        return NextResponse.json(profile[0]);
    } catch (error) {
        console.error("Error updating user profile:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
