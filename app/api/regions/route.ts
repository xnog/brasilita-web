import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const allRegions = await db.query.regions.findMany({
            orderBy: (regions, { asc }) => [asc(regions.name)]
        });

        // Formatar para o componente MultiSelect
        const formattedRegions = allRegions.map(region => ({
            value: region.id,
            label: region.name,
            description: region.examples || undefined // Para exibir na seleção
        }));

        return NextResponse.json(formattedRegions);
    } catch (error) {
        console.error("Error fetching regions:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}