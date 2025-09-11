function extractNextData(html) {
    const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s);
    if (!nextDataMatch) {
        return null;
    }

    try {
        const nextData = JSON.parse(nextDataMatch[1]);
        return nextData.props?.pageProps || null;
    } catch (e) {
        return null;
    }
}


function extractTitle(nextData) {
    if (nextData?.helmetData?.seoData?.title) {
        return nextData.helmetData.seoData.title;
    }

    if (nextData?.pdp?.propertyType?.label && nextData?.pdp?.address) {
        const propertyType = nextData.pdp.propertyType.label;
        const channel = nextData.pdp.channel === 'vendita' ? 'Vendita' : 'Affitto';
        const town = nextData.pdp.address.town || '';
        const street = nextData.pdp.address.street || '';

        let title = `${propertyType} in ${channel}`;
        if (street && town) {
            title += ` in ${street} a ${town}`;
        } else if (town) {
            title += ` a ${town}`;
        }
        return title;
    }

    return '';
}

function extractDescription(nextData) {
    if (nextData?.pdp?.description?.it?.text) {
        return nextData.pdp.description.it.text;
    }
    return '';
}

function extractPrice(nextData) {
    if (nextData?.pdp?.price?.value) {
        return nextData.pdp.price.value;
    }
    return 0;
}

function extractLocation(nextData) {
    if (nextData?.pdp?.address) {
        const address = nextData.pdp.address;
        const parts = [];
        if (address.town) parts.push(address.town);
        if (address.provinceFull) parts.push(address.provinceFull);
        // if (address.state) parts.push(address.state);
        return parts.join(', ');
    }

    return '';
}

function extractRooms(nextData) {
    if (nextData?.pdp?.rooms?.value) {
        return nextData.pdp.rooms.value;
    }
    return 0;
}

function extractBedrooms(nextData) {
    if (nextData?.pdp?.rooms?.value) {
        const rooms = nextData.pdp.rooms.value;
        return rooms > 1 ? rooms - 1 : 0;
    }
    return 0;
}

function extractBathrooms(nextData) {
    if (nextData?.mainFeatures?.baths) {
        return nextData.mainFeatures.baths;
    }
    if (nextData?.pdp?.features?.featureLists) {
        for (const featureList of nextData.pdp.features.featureLists) {
            for (const item of featureList.items) {
                if (item.label === 'Bagni') {
                    return parseInt(item.values[0]) || 1;
                }
            }
        }
    }
    return 1;
}

function extractArea(nextData) {
    if (nextData?.pdp?.size?.value) {
        return nextData.pdp.size.value;
    }
    return 0;
}

function extractFeatures(nextData) {
    const features = [];

    if (nextData?.pdp?.features?.featureLists) {
        for (const featureList of nextData.pdp.features.featureLists) {
            for (const item of featureList.items) {
                if (item.label && item.values && item.values.length > 0) {
                    const value = item.values[0];
                    let featureText = '';

                    if (typeof value === 'string') {
                        featureText = `${item.label.toLowerCase()}: ${value}`;
                    } else if (typeof value === 'object' && value !== null) {
                        if (value.main) {
                            if (typeof value.main === 'object' && value.main.value) {
                                featureText = `${item.label.toLowerCase()}: ${value.main.value}`;
                            } else {
                                featureText = `${item.label.toLowerCase()}: ${value.main}`;
                            }
                        } else if (value.value) {
                            featureText = `${item.label.toLowerCase()}: ${value.value}`;
                        }
                    } else if (typeof value === 'number') {
                        featureText = `${item.label.toLowerCase()}: ${value}`;
                    }

                    if (featureText && !featureText.includes('[object Object]')) {
                        features.push(featureText);
                    }
                }
            }
        }
    }

    return features;
}

function extractImages(html, nextData) {
    const images = [];

    if (nextData?.pdp?.media?.gallery) {
        nextData.pdp.media.gallery.forEach(item => {
            if (item.type === 'photo' && item.mediaid) {
                images.push(`https://images-1.casa.it/800x600/listing/${item.mediaid}`);
            }
        });
    }

    if (images.length === 0) {
        const ogImageMatch = html.match(/<meta content="([^"]*)" property="og:image"\/>/);
        if (ogImageMatch && ogImageMatch[1]) {
            images.push(ogImageMatch[1]);
        }
    }

    return images;
}

function extractCoordinates(nextData) {
    if (nextData?.pdp?.address?.lat && nextData?.pdp?.address?.lon) {
        return {
            latitude: parseFloat(nextData.pdp.address.lat),
            longitude: parseFloat(nextData.pdp.address.lon)
        };
    }
    return { latitude: null, longitude: null };
}

function extractRealEstate(nextData) {
    if (nextData?.pdp?.publisher?.publisherName) {
        return nextData.pdp.publisher.publisherName;
    }
    return '';
}

function extractPropertyType(nextData) {
    return '';
}

function extractIsRented(nextData) {
    // Check if the property is rented by looking for "affittato" in features
    if (nextData?.pdp?.features?.featureLists) {
        for (const featureList of nextData.pdp.features.featureLists) {
            for (const item of featureList.items) {
                if (item.label === 'Stato al rogito' && item.values && item.values.length > 0) {
                    const value = item.values[0];
                    if (typeof value === 'string' && value.toLowerCase() === 'affittato') {
                        return true;
                    }
                    if (typeof value === 'object' && value !== null) {
                        if (value.main && typeof value.main === 'string' && value.main.toLowerCase() === 'affittato') {
                            return true;
                        }
                        if (value.value && typeof value.value === 'string' && value.value.toLowerCase() === 'affittato') {
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}

function extractOriginalUrl(item) {
    return item.json.url || '';
}

function extractProperty(item) {
    try {
        const html = item.data
        const nextData = extractNextData(html);
        const now = new Date().toISOString().split('T')[0];
        const coordinates = extractCoordinates(nextData);

        // Check if we have valid nextData
        if (!nextData) {
            throw new Error('No valid nextData found in HTML');
        }

        return {
            title: extractTitle(nextData),
            description: extractDescription(nextData),
            price: extractPrice(nextData),
            location: extractLocation(nextData),
            rooms: extractRooms(nextData),
            bedrooms: extractBedrooms(nextData),
            bathrooms: extractBathrooms(nextData),
            area: extractArea(nextData),
            features: extractFeatures(nextData),
            images: extractImages(html, nextData),
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            realEstate: extractRealEstate(nextData),
            propertyType: extractPropertyType(nextData),
            isRented: extractIsRented(nextData),
            isAvailable: true,
            originalUrl: item.url,
            createdAt: now,
            updatedAt: now
        };
    } catch (error) {
        throw new Error(`Property extraction failed: ${error.message}`);
    }
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