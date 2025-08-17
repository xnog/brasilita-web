import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { asc, sql } from "drizzle-orm";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        // Get regions - this data changes rarely so it's cached by the browser
        const regions = await db.query.regions.findMany({
            orderBy: asc(sql`${sql.identifier('name')}`)
        });

        return NextResponse.json({
            regions
        }, {
            headers: {
                // Cache for 1 hour since regions don't change often
                'Cache-Control': 'public, max-age=3600'
            }
        });

    } catch (error) {
        console.error("Error fetching regions:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}