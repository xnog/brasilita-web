function extractAdMultimediasInfo(html) {
    const start = html.indexOf('var adMultimediasInfo = ') + 'var adMultimediasInfo = '.length;
    const end = html.indexOf('var adDetail = ');

    if (start === -1 || end === -1) {
        throw new Error('adMultimediasInfo variable not found');
    }

    let jsonString = html.substring(start, end).trim();

    if (jsonString.endsWith(';')) {
        jsonString = jsonString.slice(0, -1);
    }

    const obj = eval("(" + jsonString + ")");
    return JSON.parse(JSON.stringify(obj));
}

function extractConfig(html) {
    const start = html.indexOf('var config = {') + 'var config = '.length;
    const end = html.indexOf('};', start) + 1;

    if (start === -1 || end === -1) {
        throw new Error('Config variable not found');
    }

    const jsonString = html.substring(start, end).trim();
    const obj = eval("(" + jsonString + ")");
    return JSON.parse(JSON.stringify(obj));
}

function extractTitle(adMultimediasInfo) {
    return adMultimediasInfo.title || '';
}

function extractDescription(item) {
    return item.json.description
}

function extractPrice(adMultimediasInfo) {
    return adMultimediasInfo.price || 0;
}

function extractLocation(item) {
    return item.json.location;
}

function extractBedrooms(adMultimediasInfo) {
    if (adMultimediasInfo.features) {
        const roomFeature = adMultimediasInfo.features.find(f =>
            f && f.featureName === 'ROOM_NUMBER'
        );
        if (roomFeature) {
            return parseInt(roomFeature.text) || 0;
        }
    }
    return 0;
}

function extractBathrooms(item) {
    const features = item.json.features || [];

    for (const feature of features) {
        const bathroomMatch = feature.match(/(\d+)\s*bagn[oi]/i);
        if (bathroomMatch) {
            return parseInt(bathroomMatch[1]);
        }
    }

    return 0;
}

function extractArea(adMultimediasInfo) {
    if (adMultimediasInfo.features) {
        const areaFeature = adMultimediasInfo.features.find(f =>
            f && f.featureName === 'CONSTRUCTED_AREA'
        );
        if (areaFeature) {
            return parseInt(areaFeature.text) || 0;
        }
    }
    return 0;
}

function extractFeatures(item) {
    return item.json.features;
}

function extractImages(adMultimediasInfo) {
    const images = [];
    if (adMultimediasInfo.fullScreenGalleryPics) {
        adMultimediasInfo.fullScreenGalleryPics.forEach(pic => {
            if (pic.imageDataService) {
                let url = pic.imageDataService;
                url = url.replace('/WEB_DETAIL/', '/WEB_DETAIL_TOP-L-L/');
                images.push(url);
            }
        });
    }
    return images;
}

function extractCoordinates(config) {
    let latitude = null;
    let longitude = null;

    if (config.multimediaCarrousel && config.multimediaCarrousel.map && config.multimediaCarrousel.map.src) {
        const mapSrc = config.multimediaCarrousel.map.src;
        const centerMatch = mapSrc.match(/center=([0-9.-]+)%2C([0-9.-]+)/);
        if (centerMatch) {
            latitude = parseFloat(centerMatch[1]);
            longitude = parseFloat(centerMatch[2]);
        }
    }

    return { latitude, longitude };
}

function extractRealEstate(item) {
    return item.json.realEstate;
}

function extractIsRented(item) {
    const tags = item.json.tags || [];
    return tags.includes('Affittata');
}

function extractOriginalUrl(item) {
    return item.json.url;
}

function extractProperty(item, html) {
    const adMultimediasInfo = extractAdMultimediasInfo(html);
    const config = extractConfig(html);
    const now = new Date().toISOString().split('T')[0];
    const coordinates = extractCoordinates(config);

    return {
        title: extractTitle(adMultimediasInfo),
        description: extractDescription(item),
        price: extractPrice(adMultimediasInfo),
        location: extractLocation(item),
        bedrooms: extractBedrooms(adMultimediasInfo),
        bathrooms: extractBathrooms(item),
        area: extractArea(adMultimediasInfo),
        features: extractFeatures(item),
        images: extractImages(adMultimediasInfo),
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        realEstate: extractRealEstate(item),
        isRented: extractIsRented(item),
        isAvailable: true,
        originalUrl: extractOriginalUrl(item),
        createdAt: now,
        updatedAt: now
    };
}

const results = [];

for (const [index, inputItem] of $input.all().entries()) {
    try {
        const html = $('Scrape using HTML API').all()[index].json.data;
        const property = extractProperty(inputItem, html);

        results.push({
            json: property
        });

    } catch (error) {
        results.push({
            json: {
                error: error.message,
                success: false
            }
        });
    }
}

return results;