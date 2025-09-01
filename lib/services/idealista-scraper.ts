import { JSDOM } from 'jsdom';

// Types
export interface PropertyData {
    title: string;
    description: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    features: string[];
    images: string[];
    latitude: number | null;
    longitude: number | null;
    realEstate: string;
    isRented: boolean;
    isAvailable: boolean;
    originalUrl: string;
    createdAt: string;
    updatedAt: string;
}

interface AdFeature {
    featureName: string;
    text: string;
}

interface AdMultimediasInfo {
    title?: string;
    price?: number;
    features?: AdFeature[];
    fullScreenGalleryPics?: GalleryPic[];
}

interface GalleryPic {
    imageDataService?: string;
}

interface MapConfig {
    src?: string;
}

interface MultimediaCarrousel {
    map?: MapConfig;
}

interface WindowConfig {
    adFirstName?: string;
    adCommercialName?: string;
    multimediaCarrousel?: MultimediaCarrousel;
}

interface IdealistaWindow {
    adMultimediasInfo?: AdMultimediasInfo;
    config?: WindowConfig;
}

export interface ScrapingResult {
    success: boolean;
    data?: PropertyData;
    error?: string;
    meta?: {
        url: string;
        scrapedAt: string;
        htmlSize: number;
    };
}

export interface ScrapingOptions {
    userAgent?: string;
    timeout?: number;
    headers?: Record<string, string>;
}

// HTML Entity decoder
const HTML_ENTITIES: Record<string, string> = {
    '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
    '&aacute;': 'á', '&eacute;': 'é', '&iacute;': 'í', '&oacute;': 'ó', '&uacute;': 'ú',
    '&ccedil;': 'ç', '&atilde;': 'ã', '&otilde;': 'õ', '&ocirc;': 'ô',
    '&Aacute;': 'Á', '&Eacute;': 'É', '&Iacute;': 'Í', '&Oacute;': 'Ó', '&Uacute;': 'Ú',
    '&Ccedil;': 'Ç', '&Atilde;': 'Ã', '&Otilde;': 'Õ', '&euro;': '€', '&nbsp;': ' '
};

function decodeHtmlEntities(text: string): string {
    return text.replace(/&[^;]+;/g, (match) => HTML_ENTITIES[match] || match);
}

// HTML Downloader
export class HtmlDownloader {
    private defaultHeaders = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9,pt;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Cache-Control': 'max-age=0'
    };

    async download(url: string, options: ScrapingOptions = {}): Promise<string> {
        const headers = {
            ...this.defaultHeaders,
            ...(options.userAgent && { 'User-Agent': options.userAgent }),
            ...options.headers
        };

        const response = await fetch(url, {
            method: 'GET',
            headers,
            redirect: 'follow',
            signal: options.timeout ? AbortSignal.timeout(options.timeout) : undefined
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.text();
    }
}

// Property Extractor
export class PropertyExtractor {
    private document: Document;
    private window: IdealistaWindow;

    constructor(html: string) {
        const dom = new JSDOM(html, {
            url: "https://www.idealista.it",
            runScripts: "dangerously",
            resources: "usable"
        });
        this.document = dom.window.document;
        this.window = dom.window as unknown as IdealistaWindow;
    }

    extractTitle(): string {
        // 1. Check window.adMultimediasInfo
        if (this.window.adMultimediasInfo?.title) {
            return this.window.adMultimediasInfo.title.trim();
        }

        // 2. DOM element
        const stickyBarElement = this.document.querySelector('.sticky-bar-detail-heading span');
        if (stickyBarElement) {
            return stickyBarElement.textContent?.trim() || '';
        }

        // 3. Title tag
        const titleElement = this.document.querySelector('title');
        if (titleElement) {
            return titleElement.textContent?.replace(/—.*$/, '').trim() || '';
        }

        return '';
    }

    extractDescription(): string {
        // 1. Look for "Ver descrição no idioma original" pattern
        const originalDescLink = Array.from(this.document.querySelectorAll('a')).find(a =>
            a.textContent?.includes('Ver descrição no idioma original')
        );

        if (originalDescLink) {
            let current: Element | null = originalDescLink;
            while (current && current.tagName !== 'P') {
                current = current.nextElementSibling || current.parentElement?.nextElementSibling || null;
            }

            if (current && current.tagName === 'P') {
                const innerHTML = current.innerHTML;
                const textWithSpaces = innerHTML.replace(/<br\s*\/?>/gi, ' ');
                const tempDiv = this.document.createElement('div');
                tempDiv.innerHTML = textWithSpaces;
                const text = tempDiv.textContent?.trim() || '';

                if (text.length > 10) {
                    return decodeHtmlEntities(text);
                }
            }
        }

        // 2. Fallback: look for long paragraphs with property keywords
        const descElements = this.document.querySelectorAll('p');
        for (const element of descElements) {
            const innerHTML = element.innerHTML;
            const textWithSpaces = innerHTML.replace(/<br\s*\/?>/gi, ' ');
            const tempDiv = this.document.createElement('div');
            tempDiv.innerHTML = textWithSpaces;
            const text = tempDiv.textContent?.trim() || '';

            if (text.length > 100 &&
                (text.includes('apartamento') || text.includes('imóvel') ||
                    text.includes('propriedade') || text.includes('quarto'))) {
                return decodeHtmlEntities(text);
            }
        }

        // 3. Meta description fallback
        const descMeta = this.document.querySelector('meta[name="description"]');
        if (descMeta) {
            return descMeta.getAttribute('content') || '';
        }

        return '';
    }

    extractLocation(): string {
        const locationElement = this.document.querySelector('.main-info__title-minor');
        if (locationElement) {
            return locationElement.textContent?.trim() || '';
        }

        // Fallback: extract from title
        const title = this.extractTitle();
        const titleLocationMatch = title.match(/à venda em (.+?)(?:,\s*[^,]*)?$/i);
        if (titleLocationMatch) {
            return titleLocationMatch[1].trim();
        }

        return '';
    }

    extractPrice(): number {
        // 1. JavaScript variable
        if (this.window.adMultimediasInfo?.price) {
            return this.window.adMultimediasInfo.price;
        }

        // 2. DOM elements
        const priceSelectors = [
            '.price-container .price',
            '.info-data-price .txt-bold',
            '.price'
        ];

        for (const selector of priceSelectors) {
            const element = this.document.querySelector(selector);
            if (element) {
                const priceText = element.textContent?.replace(/[^\d.,]/g, '') || '';
                const price = parseFloat(priceText.replace(/\./g, '').replace(/,/g, '.'));
                if (!isNaN(price)) {
                    return price;
                }
            }
        }

        return 0;
    }

    extractArea(): number {
        // 1. JavaScript variable
        if (this.window.adMultimediasInfo?.features) {
            const areaFeature = this.window.adMultimediasInfo.features.find((f: AdFeature) =>
                f && f.featureName === 'CONSTRUCTED_AREA'
            );
            if (areaFeature) {
                return parseInt(areaFeature.text) || 0;
            }
        }

        // 2. DOM fallback
        const allText = this.document.body.textContent || '';
        const areaMatch = allText.match(/(\d+)\s*m²\s*área bruta/i);
        if (areaMatch) {
            return parseInt(areaMatch[1]);
        }

        return 0;
    }

    extractBedrooms(): number {
        // 1. JavaScript variable
        if (this.window.adMultimediasInfo?.features) {
            const roomFeature = this.window.adMultimediasInfo.features.find((f: AdFeature) =>
                f && f.featureName === 'ROOM_NUMBER'
            );
            if (roomFeature) {
                return parseInt(roomFeature.text) || 0;
            }
        }

        // 2. DOM fallback
        const allText = this.document.body.textContent || '';
        const bedroomMatch = allText.match(/(\d+)\s*quartos/i);
        if (bedroomMatch) {
            return parseInt(bedroomMatch[1]);
        }

        return 0;
    }

    extractBathrooms(): number {
        // Look in feature sections
        const caracteristicasSections = this.document.querySelectorAll('.details-property_features');

        for (const section of caracteristicasSections) {
            const listItems = section.querySelectorAll('li');
            for (const li of listItems) {
                const text = li.textContent?.trim() || '';
                const bathroomMatch = text.match(/(\d+)\s*casa de banho/i);
                if (bathroomMatch) {
                    return parseInt(bathroomMatch[1]);
                }
            }
        }

        // Fallback in full text
        const allText = this.document.body.textContent || '';
        const bathroomMatch = allText.match(/(\d+)\s*casa de banho/i);
        if (bathroomMatch) {
            return parseInt(bathroomMatch[1]);
        }

        return 0;
    }

    extractFeatures(): string[] {
        const features: string[] = [];
        const caracteristicasSections = this.document.querySelectorAll('.details-property_features');

        caracteristicasSections.forEach(section => {
            const listItems = section.querySelectorAll('li');
            listItems.forEach(li => {
                let text = li.textContent?.trim() || '';
                // Replace "casa de banho" with "banheiro"
                text = text.replace(/casa de banho/gi, 'banheiro');

                if (text.length > 3) {
                    features.push(text.toLowerCase());
                }
            });
        });

        // Remove duplicates
        return [...new Set(features)].filter(f => f && f.length > 2);
    }

    extractIsRented(): boolean {
        // Check tags first
        const rentalTags = this.document.querySelectorAll('.tag');
        for (const tag of rentalTags) {
            if (tag.textContent?.includes('Arrendada')) {
                return true;
            }
        }

        // Check page text
        const allText = this.document.body.textContent || '';
        return allText.includes('Arrendada');
    }

    extractCoordinates(): { latitude: number | null; longitude: number | null } {
        let latitude: number | null = null;
        let longitude: number | null = null;

        // Look in config.multimediaCarrousel.map.src
        if (this.window.config?.multimediaCarrousel?.map) {
            const mapSrc = this.window.config.multimediaCarrousel.map.src;
            if (mapSrc) {
                // Extract coordinates from Google Maps link
                // Format: center=45.81774160%2C9.53456340
                const centerMatch = mapSrc.match(/center=([0-9.-]+)%2C([0-9.-]+)/);
                if (centerMatch) {
                    latitude = parseFloat(centerMatch[1]);
                    longitude = parseFloat(centerMatch[2]);
                }
            }
        }

        return { latitude, longitude };
    }

    extractRealEstate(): string {
        // 1. Look in professional-name block first
        const professionalNameBlock = this.document.querySelector('.professional-name');
        if (professionalNameBlock) {
            const spanElement = professionalNameBlock.querySelector('span');
            if (spanElement) {
                const text = spanElement.textContent?.trim() || '';
                if (text.length > 3 && !text.includes('Profissional')) {
                    return decodeHtmlEntities(text);
                }
            }
        }

        // 2. Fallback: advertiser-info block
        const advertiserInfoBlock = this.document.querySelector('.advertiser-info');
        if (advertiserInfoBlock) {
            const advertiserNameElement = advertiserInfoBlock.querySelector('.advertiser-name');
            if (advertiserNameElement) {
                const text = advertiserNameElement.textContent?.trim() || '';
                if (text.length > 3 && !text.includes('Profissional')) {
                    return decodeHtmlEntities(text);
                }
            }
        }

        // 3. Global config object fallbacks
        if (this.window.config?.adFirstName) {
            const name = this.window.config.adFirstName.trim();
            if (name.length > 3 && !name.includes('Profissional')) {
                return decodeHtmlEntities(name);
            }
        }

        if (this.window.config?.adCommercialName) {
            const name = this.window.config.adCommercialName.trim();
            if (name.length > 3 && !name.includes('Profissional')) {
                return decodeHtmlEntities(name);
            }
        }

        // 4. Hidden input fallback
        const userNameInput = this.document.querySelector('input[name="user-name"]') as HTMLInputElement;
        if (userNameInput) {
            const value = userNameInput.getAttribute('value');
            if (value && value.length > 3 && !value.includes('Profissional')) {
                return decodeHtmlEntities(value);
            }
        }

        return '';
    }

    extractImages(): string[] {
        const images: string[] = [];

        // 1. JavaScript variable
        if (this.window.adMultimediasInfo?.fullScreenGalleryPics) {
            this.window.adMultimediasInfo.fullScreenGalleryPics.forEach((pic: GalleryPic) => {
                if (pic.imageDataService) {
                    let url = pic.imageDataService;
                    // Replace WEB_DETAIL with WEB_DETAIL_TOP-L-L for better quality
                    url = url.replace('/WEB_DETAIL/', '/WEB_DETAIL_TOP-L-L/');
                    images.push(url);
                }
            });
        }

        // 2. DOM fallback
        if (images.length === 0) {
            const imgElements = this.document.querySelectorAll('img[src*="idealista.it"]');
            imgElements.forEach(img => {
                const src = (img as HTMLImageElement).src;
                if (src && src.includes('/id.pro.it.image.master/')) {
                    const url = src.replace('/WEB_DETAIL/', '/WEB_DETAIL_TOP-L-L/');
                    images.push(url);
                }
            });
        }

        return images;
    }

    extractProperty(originalUrl: string): PropertyData {
        const now = new Date().toISOString().split('T')[0];
        const coordinates = this.extractCoordinates();

        return {
            title: this.extractTitle(),
            description: this.extractDescription(),
            price: this.extractPrice(),
            location: this.extractLocation(),
            bedrooms: this.extractBedrooms(),
            bathrooms: this.extractBathrooms(),
            area: this.extractArea(),
            features: this.extractFeatures(),
            images: this.extractImages(),
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            realEstate: this.extractRealEstate(),
            isRented: this.extractIsRented(),
            isAvailable: true,
            originalUrl,
            createdAt: now,
            updatedAt: now
        };
    }
}

// Main Scraper Service
export class IdealistaScraper {
    private downloader: HtmlDownloader;

    constructor() {
        this.downloader = new HtmlDownloader();
    }

    async scrapeProperty(url: string, options: ScrapingOptions = {}): Promise<ScrapingResult> {
        try {
            // Validate URL
            if (!url.includes('idealista.it')) {
                return {
                    success: false,
                    error: 'This scraper only works with idealista.it URLs'
                };
            }

            console.log(`Scraping property from: ${url}`);

            // Download HTML
            const html = await this.downloader.download(url, options);
            console.log(`Downloaded HTML (${html.length} characters)`);

            // Extract property data
            const extractor = new PropertyExtractor(html);
            const property = extractor.extractProperty(url);

            console.log(`Extracted property: ${property.title}`);

            return {
                success: true,
                data: property,
                meta: {
                    url,
                    scrapedAt: new Date().toISOString(),
                    htmlSize: html.length
                }
            };

        } catch (error) {
            console.error('Scraping error:', error);

            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown scraping error'
            };
        }
    }

    // Static method for one-off scraping
    static async scrape(url: string, options: ScrapingOptions = {}): Promise<ScrapingResult> {
        const scraper = new IdealistaScraper();
        return scraper.scrapeProperty(url, options);
    }
}
