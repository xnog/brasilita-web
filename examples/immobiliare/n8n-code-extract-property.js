const HTML_ENTITIES = {
    '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
    '&aacute;': 'á', '&eacute;': 'é', '&iacute;': 'í', '&oacute;': 'ó', '&uacute;': 'ú',
    '&ccedil;': 'ç', '&atilde;': 'ã', '&otilde;': 'õ', '&ocirc;': 'ô',
    '&Aacute;': 'Á', '&Eacute;': 'É', '&Iacute;': 'Í', '&Oacute;': 'Ó', '&Uacute;': 'Ú',
    '&Ccedil;': 'Ç', '&Atilde;': 'Ã', '&Otilde;': 'Õ', '&euro;': '€', '&nbsp;': ' ',
    '&egrave;': 'è', '&ugrave;': 'ù', '&agrave;': 'à', '&igrave;': 'ì', '&ograve;': 'ò'
};

function decodeHtmlEntities(text) {
    if (!text) return '';
    return text.replace(/&[^;]+;/g, (match) => HTML_ENTITIES[match] || match);
}

function extractNextData(html) {
    const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s);
    if (!nextDataMatch) {
        return null;
    }

    try {
        const nextData = JSON.parse(nextDataMatch[1]);
        return nextData.props?.pageProps?.detailData?.realEstate || null;
    } catch (e) {
        return null;
    }
}

function extractTitle(propertyData) {
    return propertyData?.title || '';
}

function extractDescription(propertyData) {
    const caption = propertyData?.properties?.[0]?.caption || '';
    const description = propertyData?.properties?.[0]?.description || '';

    let text = decodeHtmlEntities(description).trim();

    if (caption) {
        text = `${caption}\n\n${text}`;
    }

    return text;
}

function extractLocation(propertyData) {
    const location = propertyData?.properties?.[0]?.location;
    if (!location) return '';

    const parts = [];
    if (location.address) parts.push(location.address);
    if (location.macrozone) parts.push(location.macrozone);
    if (location.city) parts.push(location.city);
    if (location.province) parts.push(location.province);
    if (location.region) parts.push(location.region);

    return parts.join(', ');
}

function extractPrice(propertyData) {
    return propertyData?.price?.value || 0;
}

function extractArea(propertyData) {
    const property = propertyData?.properties?.[0];
    if (property?.surfaceValue) {
        const areaMatch = property.surfaceValue.match(/(\d+)/);
        if (areaMatch) {
            return parseInt(areaMatch[1]);
        }
    }
    return 0;
}

function extractRooms(propertyData) {
    const property = propertyData?.properties?.[0];
    if (property?.rooms) {
        const rooms = parseInt(property.rooms);
        return !isNaN(rooms) ? rooms : 0;
    }
    return 0;
}

function extractBedrooms(propertyData) {
    const property = propertyData?.properties?.[0];
    if (property?.bedRoomsNumber) {
        const bedrooms = parseInt(property.bedRoomsNumber);
        return !isNaN(bedrooms) ? bedrooms : 0;
    }
    return 0;
}

function extractBathrooms(propertyData) {
    const property = propertyData?.properties?.[0];
    if (property?.bathrooms) {
        const bathrooms = parseInt(property.bathrooms);
        return !isNaN(bathrooms) ? bathrooms : 0;
    }
    return 0;
}

function extractFeatures(propertyData) {
    const features = [];
    const property = propertyData?.properties?.[0];

    if (property?.primaryFeatures) {
        property.primaryFeatures.forEach(feature => {
            if (feature.name && feature.isVisible && feature.value) {
                features.push(feature.name.toLowerCase());
            }
        });
    }

    if (property?.features) {
        property.features.forEach(feature => {
            if (typeof feature === 'string') {
                features.push(feature.toLowerCase());
            }
        });
    }

    return [...new Set(features)].filter(f => f && f.length > 2);
}

function extractImages(propertyData) {
    const images = [];
    const property = propertyData?.properties?.[0];

    if (property?.multimedia?.photos) {
        property.multimedia.photos.forEach(photo => {
            if (photo.urls?.large) {
                images.push(photo.urls.large);
            } else if (photo.urls?.medium) {
                images.push(photo.urls.medium);
            }
        });
    }

    return images;
}

function extractCoordinates(propertyData) {
    const property = propertyData?.properties?.[0];
    const location = property?.location;

    if (location?.latitude && location?.longitude) {
        return {
            latitude: parseFloat(location.latitude),
            longitude: parseFloat(location.longitude)
        };
    }
    return { latitude: null, longitude: null };
}

function extractRealEstate(propertyData) {
    const agencyName = propertyData?.advertiser?.agency?.displayName || '';
    return decodeHtmlEntities(agencyName);
}

function extractPropertyType(propertyData) {
    return '';
    // return propertyData?.typology?.name || '';
}

function extractProperty(input) {
    const html = input.data;
    const propertyData = extractNextData(html);
    const now = new Date().toISOString().split('T')[0];
    const coordinates = extractCoordinates(propertyData);

    return {
        title: extractTitle(propertyData),
        description: extractDescription(propertyData),
        price: extractPrice(propertyData),
        location: extractLocation(propertyData),
        rooms: extractRooms(propertyData),
        bedrooms: extractBedrooms(propertyData),
        bathrooms: extractBathrooms(propertyData),
        area: extractArea(propertyData),
        features: extractFeatures(propertyData),
        images: extractImages(propertyData),
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        realEstate: extractRealEstate(propertyData),
        propertyType: extractPropertyType(propertyData),
        isRented: false,
        isAvailable: true,
        originalUrl: '',
        createdAt: now,
        updatedAt: now
    };
}

const results = [];

for (const input of $input.all()) {
    try {
        const property = extractProperty(input.json);

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
