import { NextRequest, NextResponse } from 'next/server';
import { IdealistaScraper, type ScrapingOptions } from '@/lib/services/idealista-scraper';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { url, options } = body;

        if (!url) {
            return NextResponse.json(
                { error: 'URL is required' },
                { status: 400 }
            );
        }

        // Use the scraper service
        const result = await IdealistaScraper.scrape(url, options as ScrapingOptions);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: 400 }
            );
        }

        return NextResponse.json(result);

    } catch (error) {
        console.error('API error:', error);

        return NextResponse.json(
            {
                error: 'Failed to scrape property data',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const url = searchParams.get('url');

        if (!url) {
            return NextResponse.json(
                { error: 'URL parameter is required' },
                { status: 400 }
            );
        }

        // Use the scraper service directly
        const result = await IdealistaScraper.scrape(url);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: 400 }
            );
        }

        return NextResponse.json(result);

    } catch (error) {
        console.error('API error:', error);

        return NextResponse.json(
            {
                error: 'Failed to scrape property data',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
