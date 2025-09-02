// N8N Idealista Property Parser
// Copy and paste this code into your n8n Code node

const items = $input.all();

// HTML Entity decoder
const HTML_ENTITIES = {
    '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
    '&aacute;': 'á', '&eacute;': 'é', '&iacute;': 'í', '&oacute;': 'ó', '&uacute;': 'ú',
    '&ccedil;': 'ç', '&atilde;': 'ã', '&otilde;': 'õ', '&ocirc;': 'ô',
    '&Aacute;': 'Á', '&Eacute;': 'É', '&Iacute;': 'Í', '&Oacute;': 'Ó', '&Uacute;': 'Ú',
    '&Ccedil;': 'Ç', '&Atilde;': 'Ã', '&Otilde;': 'Õ', '&euro;': '€', '&nbsp;': ' '
};

function decodeHtmlEntities(text) {
    return text.replace(/&[^;]+;/g, (match) => HTML_ENTITIES[match] || match);
}

function extractTitle(html) {
    // Try to extract from title tag
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    if (titleMatch) {
        return titleMatch[1].replace(/—.*$/, '').trim();
    }
    return '';
}

function extractDescription(html) {
    // Pattern 1: Look for the specific Idealista description structure
    // <div class="adCommentsLanguage expandable">...<p>DESCRIPTION</p>
    const idealistaDescPattern = /Ver descrição no idioma original.*?<\/a>\s*<\/span>\s*<\/div>\s*<p[^>]*>(.*?)<\/p>/is;
    const idealistaMatch = html.match(idealistaDescPattern);

    if (idealistaMatch) {
        const innerHTML = idealistaMatch[1];
        const textWithSpaces = innerHTML.replace(/<br\s*\/?>/gi, ' ');
        const text = textWithSpaces.replace(/<[^>]*>/g, '').trim();

        if (text.length > 20) {
            return decodeHtmlEntities(text);
        }
    }

    // Pattern 2: Look for adCommentsLanguage class directly
    const commentsPattern = /<div[^>]*class="[^"]*adCommentsLanguage[^"]*"[^>]*>.*?<p[^>]*>(.*?)<\/p>/is;
    const commentsMatch = html.match(commentsPattern);

    if (commentsMatch) {
        const innerHTML = commentsMatch[1];
        const textWithSpaces = innerHTML.replace(/<br\s*\/?>/gi, ' ');
        const text = textWithSpaces.replace(/<[^>]*>/g, '').trim();

        if (text.length > 20 && !text.includes('Esta descrição foi traduzida')) {
            return decodeHtmlEntities(text);
        }
    }

    // Pattern 3: Look for any paragraph after "Ver descrição no idioma original"
    const afterOriginalPattern = /Ver descrição no idioma original.*?<p[^>]*>(.*?)<\/p>/is;
    const afterOriginalMatch = html.match(afterOriginalPattern);

    if (afterOriginalMatch) {
        const innerHTML = afterOriginalMatch[1];
        const textWithSpaces = innerHTML.replace(/<br\s*\/?>/gi, ' ');
        const text = textWithSpaces.replace(/<[^>]*>/g, '').trim();

        if (text.length > 50 &&
            !text.includes('Esta descrição foi traduzida') &&
            !text.includes('Receber alerta')) {
            return decodeHtmlEntities(text);
        }
    }

    // Fallback: look for long paragraphs with property keywords
    const paragraphPattern = /<p[^>]*>(.*?)<\/p>/gi;
    let match;

    while ((match = paragraphPattern.exec(html)) !== null) {
        const innerHTML = match[1];
        const textWithSpaces = innerHTML.replace(/<br\s*\/?>/gi, ' ');
        const text = textWithSpaces.replace(/<[^>]*>/g, '').trim();

        // Skip common non-description texts
        if (text.includes('Receber alerta') ||
            text.includes('Esta descrição foi traduzida') ||
            text.includes('cookies') ||
            text.length < 100) {
            continue;
        }

        if (text.includes('apartamento') || text.includes('imóvel') ||
            text.includes('propriedade') || text.includes('quarto') ||
            text.includes('edifício') || text.includes('habitação')) {
            return decodeHtmlEntities(text);
        }
    }

    // Meta description fallback
    const metaDescMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"[^>]*>/i);
    if (metaDescMatch && metaDescMatch[1].length > 20) {
        return decodeHtmlEntities(metaDescMatch[1]);
    }

    return '';
}

function extractLocation(html) {
    // Look for main-info__title-minor class
    const locationMatch = html.match(/<[^>]*class="[^"]*main-info__title-minor[^"]*"[^>]*>(.*?)<\/[^>]*>/i);
    if (locationMatch) {
        return locationMatch[1].replace(/<[^>]*>/g, '').trim();
    }
    return '';
}

function extractPrice(html, adMultimediasInfo) {
    // First try from JavaScript variable
    if (adMultimediasInfo && adMultimediasInfo.price) {
        return adMultimediasInfo.price;
    }

    // Try to extract from price elements
    const pricePatterns = [
        /<[^>]*class="[^"]*price[^"]*"[^>]*>([^<]*)</gi,
        /<[^>]*class="[^"]*txt-bold[^"]*"[^>]*>([^<]*)</gi
    ];

    for (const pattern of pricePatterns) {
        const match = html.match(pattern);
        if (match) {
            const priceText = match[1].replace(/[^\d.,]/g, '');
            const price = parseFloat(priceText.replace(/\./g, '').replace(/,/g, '.'));
            if (!isNaN(price)) {
                return price;
            }
        }
    }

    return 0;
}

function extractArea(html, adMultimediasInfo) {
    // First try from JavaScript variable
    if (adMultimediasInfo && adMultimediasInfo.features) {
        const areaFeature = adMultimediasInfo.features.find(f =>
            f && f.featureName === 'CONSTRUCTED_AREA'
        );
        if (areaFeature) {
            return parseInt(areaFeature.text) || 0;
        }
    }

    // Fallback: regex search
    const areaMatch = html.match(/(\d+)\s*m²\s*área bruta/i);
    if (areaMatch) {
        return parseInt(areaMatch[1]);
    }

    return 0;
}

function extractBedrooms(html, adMultimediasInfo) {
    // First try from JavaScript variable
    if (adMultimediasInfo && adMultimediasInfo.features) {
        const roomFeature = adMultimediasInfo.features.find(f =>
            f && f.featureName === 'ROOM_NUMBER'
        );
        if (roomFeature) {
            return parseInt(roomFeature.text) || 0;
        }
    }

    // Fallback: regex search
    const bedroomMatch = html.match(/(\d+)\s*quartos/i);
    if (bedroomMatch) {
        return parseInt(bedroomMatch[1]);
    }

    return 0;
}

function extractBathrooms(html) {
    const bathroomMatch = html.match(/(\d+)\s*casa de banho/i);
    if (bathroomMatch) {
        return parseInt(bathroomMatch[1]);
    }
    return 0;
}

function extractFeatures(html) {
    const features = [];

    // Look for feature lists
    const featurePattern = /<li[^>]*>(.*?)<\/li>/gi;
    let match;

    while ((match = featurePattern.exec(html)) !== null) {
        let text = match[1].replace(/<[^>]*>/g, '').trim();
        // Replace "casa de banho" with "banheiro"
        text = text.replace(/casa de banho/gi, 'banheiro');

        if (text.length > 3) {
            features.push(text.toLowerCase());
        }
    }

    // Remove duplicates
    return [...new Set(features)].filter(f => f && f.length > 2);
}

function extractIsRented(html) {
    return html.includes('Arrendada');
}

function extractCoordinates(html) {
    // Look for Google Maps coordinates in map src
    const mapMatch = html.match(/center=([0-9.-]+)%2C([0-9.-]+)/);
    if (mapMatch) {
        return {
            latitude: parseFloat(mapMatch[1]),
            longitude: parseFloat(mapMatch[2])
        };
    }
    return { latitude: null, longitude: null };
}

function extractRealEstate(html) {
    // Look for professional name or advertiser info
    const patterns = [
        /<[^>]*class="[^"]*professional-name[^"]*"[^>]*>.*?<span[^>]*>(.*?)<\/span>/i,
        /<[^>]*class="[^"]*advertiser-name[^"]*"[^>]*>(.*?)<\/[^>]*>/i
    ];

    for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match) {
            const text = match[1].replace(/<[^>]*>/g, '').trim();
            if (text.length > 3 && !text.includes('Profissional')) {
                return decodeHtmlEntities(text);
            }
        }
    }

    return '';
}

function extractImages(html, adMultimediasInfo) {
    const images = [];

    // First try from JavaScript variable
    if (adMultimediasInfo && adMultimediasInfo.fullScreenGalleryPics) {
        adMultimediasInfo.fullScreenGalleryPics.forEach(pic => {
            if (pic.imageDataService) {
                let url = pic.imageDataService;
                // Replace WEB_DETAIL with WEB_DETAIL_TOP-L-L for better quality
                url = url.replace('/WEB_DETAIL/', '/WEB_DETAIL_TOP-L-L/');
                images.push(url);
            }
        });
    }

    // Fallback: extract from img tags
    if (images.length === 0) {
        const imgPattern = /<img[^>]+src="([^"]*idealista\.it[^"]*)"[^>]*>/gi;
        let match;

        while ((match = imgPattern.exec(html)) !== null) {
            const src = match[1];
            if (src.includes('/id.pro.it.image.master/')) {
                const url = src.replace('/WEB_DETAIL/', '/WEB_DETAIL_TOP-L-L/');
                images.push(url);
            }
        }
    }

    return images;
}

// Main processing function
const updatedItems = items.map((item) => {
    const response = item?.json?.solution?.response || "";
    let adMultimediasInfo = null;
    let config = null;

    // Extract adMultimediasInfo JavaScript object
    try {
        // Look for adMultimediasInfo with more comprehensive patterns
        const patterns = [
            // Pattern 1: window.adMultimediasInfo = {...};
            /window\.adMultimediasInfo\s*=\s*(\{[\s\S]*?\});/,
            // Pattern 2: adMultimediasInfo = {...};
            /(?:var\s+)?adMultimediasInfo\s*=\s*(\{[\s\S]*?\});/,
            // Pattern 3: Look for it in any script block
            /<script[^>]*>[\s\S]*?adMultimediasInfo\s*=\s*(\{[\s\S]*?\});[\s\S]*?<\/script>/,
            // Pattern 4: More flexible pattern
            /adMultimediasInfo["\s]*[:=]\s*(\{[\s\S]*?\})\s*[;,\n]/
        ];

        for (let i = 0; i < patterns.length; i++) {
            const match = response.match(patterns[i]);
            if (match && match[1]) {
                console.log(`Trying pattern ${i + 1} for adMultimediasInfo`);

                let jsonStr = match[1];

                // Log the raw match for debugging
                console.log("Raw adMultimediasInfo match:", jsonStr.substring(0, 200) + "...");

                // Try to parse as-is first (in case it's already valid JSON)
                try {
                    adMultimediasInfo = JSON.parse(jsonStr);
                    console.log("Successfully parsed adMultimediasInfo as valid JSON");
                    break;
                } catch (e) {
                    // If that fails, try to convert JavaScript object to JSON
                    try {
                        // Remove trailing semicolon and clean up
                        jsonStr = jsonStr.replace(/;$/, '').trim();

                        // Convert JavaScript object notation to JSON
                        // Handle unquoted keys
                        jsonStr = jsonStr.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');

                        // Handle single quotes
                        jsonStr = jsonStr.replace(/'/g, '"');

                        // Handle undefined values
                        jsonStr = jsonStr.replace(/:\s*undefined/g, ': null');

                        adMultimediasInfo = JSON.parse(jsonStr);
                        console.log("Successfully converted and parsed adMultimediasInfo");
                        break;
                    } catch (e2) {
                        console.log(`Pattern ${i + 1} failed to parse:`, e2.message);
                        continue;
                    }
                }
            }
        }

        // If still no success, try a more aggressive search
        if (!adMultimediasInfo) {
            console.log("Trying aggressive search for adMultimediasInfo...");

            // Look for any object that contains typical property fields
            const aggressivePattern = /(\{[^{}]*(?:"?(?:title|price|features)"?[^{}]*)+[^{}]*\})/g;
            let match;

            while ((match = aggressivePattern.exec(response)) !== null) {
                try {
                    const testObj = JSON.parse(match[1]);
                    if (testObj.title || testObj.price || testObj.features) {
                        adMultimediasInfo = testObj;
                        console.log("Found adMultimediasInfo using aggressive search");
                        break;
                    }
                } catch (e) {
                    continue;
                }
            }
        }

    } catch (error) {
        console.log("Error extracting adMultimediasInfo:", error.message);
    }

    // Debug: Show what we're working with
    if (!adMultimediasInfo) {
        console.log("=== DEBUG: adMultimediasInfo not found ===");

        // Look for any mention of adMultimediasInfo in the HTML
        const adMultimediasInfoMentions = response.match(/adMultimediasInfo[^;]{0,100}/g);
        if (adMultimediasInfoMentions) {
            console.log("Found adMultimediasInfo mentions:", adMultimediasInfoMentions);
        }

        // Look for any JavaScript variable assignments
        const jsAssignments = response.match(/\w+\s*=\s*\{[^}]{20,100}\}/g);
        if (jsAssignments) {
            console.log("Found JS object assignments:", jsAssignments.slice(0, 5)); // Show first 5
        }

        // Look for price patterns in the HTML
        const pricePatterns = response.match(/€\s*[\d.,]+/g);
        if (pricePatterns) {
            console.log("Found price patterns:", pricePatterns.slice(0, 3));
        }

        console.log("=== END DEBUG ===");
    }

    // Extract all property data
    const now = new Date().toISOString().split('T')[0];
    const coordinates = extractCoordinates(response);
    const originalUrl = item?.json?.url || '';

    const propertyData = {
        title: extractTitle(response),
        description: extractDescription(response),
        price: extractPrice(response, adMultimediasInfo),
        location: extractLocation(response),
        bedrooms: extractBedrooms(response, adMultimediasInfo),
        bathrooms: extractBathrooms(response),
        area: extractArea(response, adMultimediasInfo),
        features: extractFeatures(response),
        images: extractImages(response, adMultimediasInfo),
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        realEstate: extractRealEstate(response),
        isRented: extractIsRented(response),
        isAvailable: true,
        originalUrl: originalUrl,
        createdAt: now,
        updatedAt: now
    };

    return {
        json: {
            success: true,
            data: propertyData,
            meta: {
                url: originalUrl,
                scrapedAt: new Date().toISOString(),
                htmlSize: response.length
            },
            // Include raw extracted data for debugging
            debug: {
                adMultimediasInfo,
                config
            }
        }
    };
});

return updatedItems;
