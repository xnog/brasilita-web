/**
 * Browser Property Extractor for idealista.it
 * 
 * Usage:
 * 1. Navigate to a property page on idealista.it
 * 2. Open browser console (F12)
 * 3. Paste this entire script and press Enter
 * 4. Clean JSON will be displayed in console
 */

(function () {
    'use strict';

    class PropertyExtractor {
        constructor() {
            // HTML Entity decoder
            this.entities = {
                '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
                '&aacute;': 'á', '&eacute;': 'é', '&iacute;': 'í', '&oacute;': 'ó', '&uacute;': 'ú',
                '&ccedil;': 'ç', '&atilde;': 'ã', '&otilde;': 'õ', '&ocirc;': 'ô',
                '&Aacute;': 'Á', '&Eacute;': 'É', '&Iacute;': 'Í', '&Oacute;': 'Ó', '&Uacute;': 'Ú',
                '&Ccedil;': 'Ç', '&Atilde;': 'Ã', '&Otilde;': 'Õ', '&euro;': '€', '&nbsp;': ' '
            };
        }

        decodeHtmlEntities(text) {
            return text.replace(/&[^;]+;/g, (match) => this.entities[match] || match);
        }

        // ========== EXTRAÇÃO DE TÍTULO ==========
        extractTitle() {
            // 1. JavaScript variable
            if (window.adMultimediasInfo && window.adMultimediasInfo.title) {
                return window.adMultimediasInfo.title.trim();
            }

            // 2. DOM element
            const stickyBarElement = document.querySelector('.sticky-bar-detail-heading span');
            if (stickyBarElement) {
                return stickyBarElement.textContent.trim();
            }

            // 3. Title tag
            const titleElement = document.querySelector('title');
            if (titleElement) {
                return titleElement.textContent.replace(/—.*$/, '').trim();
            }

            return '';
        }

        // ========== EXTRAÇÃO DE DESCRIÇÃO ==========
        extractDescription() {
            // 1. Buscar pelo padrão estrutural: <p> que vem após "Ver descrição no idioma original"
            const originalDescLink = Array.from(document.querySelectorAll('a')).find(a =>
                a.textContent.includes('Ver descrição no idioma original')
            );

            if (originalDescLink) {
                // Navegar até o próximo <p> após esse link
                let current = originalDescLink;
                while (current && current.tagName !== 'P') {
                    current = current.nextElementSibling || current.parentElement?.nextElementSibling;
                }

                if (current && current.tagName === 'P') {
                    // Substituir <br> por espaços antes de extrair o texto
                    const innerHTML = current.innerHTML;
                    const textWithSpaces = innerHTML.replace(/<br\s*\/?>/gi, ' ');

                    // Criar elemento temporário para extrair texto limpo
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = textWithSpaces;
                    const text = tempDiv.textContent.trim();

                    if (text.length > 10) {
                        return this.decodeHtmlEntities(text);
                    }
                }
            }

            // 2. Fallback: buscar o primeiro <p> longo com conteúdo relevante
            const descElements = document.querySelectorAll('p');
            for (const element of descElements) {
                const innerHTML = element.innerHTML;
                const textWithSpaces = innerHTML.replace(/<br\s*\/?>/gi, ' ');

                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = textWithSpaces;
                const text = tempDiv.textContent.trim();

                // Deve ser longo e conter palavras-chave de descrição de imóvel
                if (text.length > 100 &&
                    (text.includes('apartamento') || text.includes('imóvel') ||
                        text.includes('propriedade') || text.includes('quarto'))) {
                    return this.decodeHtmlEntities(text);
                }
            }

            // 3. Fallback final para meta description
            const descMeta = document.querySelector('meta[name="description"]');
            if (descMeta) {
                return descMeta.getAttribute('content') || '';
            }

            return '';
        }

        // ========== EXTRAÇÃO DE LOCALIZAÇÃO ==========
        extractLocation() {
            // DOM element
            const locationElement = document.querySelector('.main-info__title-minor');
            if (locationElement) {
                return locationElement.textContent.trim();
            }

            // Fallback: extrair do título
            const title = this.extractTitle();
            const titleLocationMatch = title.match(/à venda em (.+?)(?:,\s*[^,]*)?$/i);
            if (titleLocationMatch) {
                return titleLocationMatch[1].trim();
            }

            return '';
        }

        // ========== EXTRAÇÃO DE PREÇO ==========
        extractPrice() {
            // 1. JavaScript variable
            if (window.adMultimediasInfo && window.adMultimediasInfo.price) {
                return window.adMultimediasInfo.price;
            }

            // 2. DOM elements
            const priceSelectors = [
                '.price-container .price',
                '.info-data-price .txt-bold',
                '.price'
            ];

            for (const selector of priceSelectors) {
                const element = document.querySelector(selector);
                if (element) {
                    const priceText = element.textContent.replace(/[^\d.,]/g, '');
                    const price = parseFloat(priceText.replace(/\./g, '').replace(/,/g, '.'));
                    if (!isNaN(price)) {
                        return price;
                    }
                }
            }

            return 0;
        }

        // ========== EXTRAÇÃO DE ÁREA ==========
        extractArea() {
            // 1. JavaScript variable
            if (window.adMultimediasInfo && window.adMultimediasInfo.features) {
                const areaFeature = window.adMultimediasInfo.features.find(f =>
                    f && f.featureName === 'CONSTRUCTED_AREA'
                );
                if (areaFeature) {
                    return parseInt(areaFeature.text) || 0;
                }
            }

            // 2. DOM fallback
            const allText = document.body.innerText;
            const areaMatch = allText.match(/(\d+)\s*m²\s*área bruta/i);
            if (areaMatch) {
                return parseInt(areaMatch[1]);
            }

            return 0;
        }

        // ========== EXTRAÇÃO DE QUARTOS ==========
        extractBedrooms() {
            // 1. JavaScript variable
            if (window.adMultimediasInfo && window.adMultimediasInfo.features) {
                const roomFeature = window.adMultimediasInfo.features.find(f =>
                    f && f.featureName === 'ROOM_NUMBER'
                );
                if (roomFeature) {
                    return parseInt(roomFeature.text) || 0;
                }
            }

            // 2. DOM fallback
            const allText = document.body.innerText;
            const bedroomMatch = allText.match(/(\d+)\s*quartos/i);
            if (bedroomMatch) {
                return parseInt(bedroomMatch[1]);
            }

            return 0;
        }

        // ========== EXTRAÇÃO DE BANHEIROS ==========
        extractBathrooms() {
            // Buscar em todas as seções de características
            const caracteristicasSections = document.querySelectorAll('.details-property_features');

            for (const section of caracteristicasSections) {
                const listItems = section.querySelectorAll('li');
                for (const li of listItems) {
                    const text = li.textContent.trim();
                    const bathroomMatch = text.match(/(\d+)\s*casa de banho/i);
                    if (bathroomMatch) {
                        return parseInt(bathroomMatch[1]);
                    }
                }
            }

            // Fallback no texto completo
            const allText = document.body.innerText;
            const bathroomMatch = allText.match(/(\d+)\s*casa de banho/i);
            if (bathroomMatch) {
                return parseInt(bathroomMatch[1]);
            }

            return 0;
        }

        // ========== EXTRAÇÃO DE FEATURES ==========
        extractFeatures() {
            const features = [];

            // Pegar todas as seções .details-property_features
            const caracteristicasSections = document.querySelectorAll('.details-property_features');

            caracteristicasSections.forEach(section => {
                const listItems = section.querySelectorAll('li');

                listItems.forEach(li => {
                    let text = li.textContent.trim();

                    // Replace "casa de banho" with "banheiro"
                    text = text.replace(/casa de banho/gi, 'banheiro');

                    // Adicionar cada <li> como uma feature
                    if (text.length > 3) {
                        features.push(text.toLowerCase());
                    }
                });
            });

            // Remover duplicatas
            return [...new Set(features)].filter(f => f && f.length > 2);
        }

        // ========== EXTRAÇÃO DE STATUS DE ALUGUEL ==========
        extractIsRented() {
            // Verificar nas tags primeiro
            const rentalTags = document.querySelectorAll('.tag');
            for (const tag of rentalTags) {
                if (tag.textContent.includes('Arrendada')) {
                    return true;
                }
            }

            // Verificar no texto da página
            const allText = document.body.innerText;
            if (allText.includes('Arrendada')) {
                return true;
            }

            return false;
        }

        // ========== EXTRAÇÃO DE COORDENADAS ==========
        extractCoordinates() {
            let latitude = null;
            let longitude = null;

            // 1. Buscar no config.multimediaCarrousel.map.src
            if (window.config && window.config.multimediaCarrousel && window.config.multimediaCarrousel.map) {
                const mapSrc = window.config.multimediaCarrousel.map.src;
                if (mapSrc) {
                    // Extrair coordenadas do link do Google Maps
                    // Formato: center=45.81774160%2C9.53456340
                    const centerMatch = mapSrc.match(/center=([0-9.-]+)%2C([0-9.-]+)/);
                    if (centerMatch) {
                        latitude = parseFloat(centerMatch[1]);
                        longitude = parseFloat(centerMatch[2]);
                    }
                }
            }

            return { latitude, longitude };
        }

        // ========== EXTRAÇÃO DE NOME DA IMOBILIÁRIA ==========
        extractRealEstate() {
            // 1. PRINCIPAL: Buscar no objeto config global (adFirstName)
            if (window.config && window.config.adFirstName) {
                const name = window.config.adFirstName.trim();
                if (name.length > 3 && !name.includes('Profissional')) {
                    return this.decodeHtmlEntities(name);
                }
            }

            // 2. Fallback: adCommercialName no config
            if (window.config && window.config.adCommercialName) {
                const name = window.config.adCommercialName.trim();
                if (name.length > 3 && !name.includes('Profissional')) {
                    return this.decodeHtmlEntities(name);
                }
            }

            // 3. Fallback: input hidden com name="user-name"
            const userNameInput = document.querySelector('input[name="user-name"]');
            if (userNameInput) {
                const value = userNameInput.getAttribute('value');
                if (value && value.length > 3 && !value.includes('Profissional')) {
                    return this.decodeHtmlEntities(value);
                }
            }

            // 4. Fallback: elemento .advertiser-name
            const advertiserNameElement = document.querySelector('.advertiser-name');
            if (advertiserNameElement) {
                const text = advertiserNameElement.textContent.trim();
                if (text.length > 3 && !text.includes('Profissional')) {
                    return this.decodeHtmlEntities(text);
                }
            }

            // 5. Fallback: elemento .about-advertiser-name
            const aboutAdvertiserNameElement = document.querySelector('.about-advertiser-name');
            if (aboutAdvertiserNameElement) {
                const text = aboutAdvertiserNameElement.textContent.trim();
                if (text.length > 3 && !text.includes('Profissional')) {
                    return this.decodeHtmlEntities(text);
                }
            }

            return '';
        }

        // ========== EXTRAÇÃO DE IMAGENS ==========
        extractImages() {
            const images = [];

            // 1. JavaScript variable
            if (window.adMultimediasInfo && window.adMultimediasInfo.fullScreenGalleryPics) {
                window.adMultimediasInfo.fullScreenGalleryPics.forEach(pic => {
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
                const imgElements = document.querySelectorAll('img[src*="idealista.it"]');
                imgElements.forEach(img => {
                    let src = img.src;
                    if (src && src.includes('/id.pro.it.image.master/')) {
                        src = src.replace('/WEB_DETAIL/', '/WEB_DETAIL_TOP-L-L/');
                        images.push(src);
                    }
                });
            }

            return images;
        }

        // ========== FUNÇÃO PRINCIPAL DE EXTRAÇÃO ==========
        extractProperty() {
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
                originalUrl: window.location.href,
                createdAt: now,
                updatedAt: now
            };
        }

        // ========== EXECUÇÃO NO BROWSER ==========
        run() {
            try {
                if (!window.location.hostname.includes('idealista.it')) {
                    throw new Error('This script works only on idealista.it property pages');
                }

                const property = this.extractProperty();

                // Clear console and show only clean JSON
                console.clear();
                console.log(property);

                // Make the property data available globally
                window.extractedProperty = property;

                return property;
            } catch (error) {
                console.error('❌ Error:', error.message);
                throw error;
            }
        }
    }

    // Create and run extractor
    const extractor = new PropertyExtractor();
    extractor.run();

})();