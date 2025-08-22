/**
 * Script para gerar comandos SQL de UPDATE com coordenadas
 * 
 * Usage:
 * 1. Navegue até uma página de propriedade no idealista.it
 * 2. Abra o console do navegador (F12)
 * 3. Cole este script inteiro e pressione Enter
 * 4. O comando SQL será exibido no console e copiado para o clipboard
 */

(function () {
    'use strict';

    class CoordinatesUpdater {
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

        // ========== GERAÇÃO DO SQL ==========
        generateUpdateSQL() {
            const coordinates = this.extractCoordinates();
            const currentUrl = window.location.href;

            if (coordinates.latitude === null || coordinates.longitude === null) {
                return {
                    success: false,
                    message: '❌ Coordenadas não encontradas nesta página',
                    sql: null
                };
            }

            // Escapar a URL para uso seguro no SQL
            const escapedUrl = currentUrl.replace(/'/g, "''");

            // Gerar o comando SQL UPDATE
            const sql = `UPDATE properties 
SET latitude = ${coordinates.latitude}, 
    longitude = ${coordinates.longitude}, 
    updated_at = NOW() 
WHERE original_url = '${escapedUrl}';`;

            return {
                success: true,
                message: `✅ Coordenadas extraídas: ${coordinates.latitude}, ${coordinates.longitude}`,
                sql: sql,
                coordinates: coordinates,
                url: currentUrl
            };
        }

        // ========== CÓPIA PARA CLIPBOARD ==========
        async copyToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (err) {
                // Fallback para navegadores mais antigos
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            }
        }

        // ========== EXECUÇÃO PRINCIPAL ==========
        async run() {
            try {
                // Verificar se estamos no idealista.it
                if (!window.location.hostname.includes('idealista.it')) {
                    throw new Error('Este script funciona apenas em páginas de propriedade do idealista.it');
                }

                console.clear();
                console.log('🔄 Extraindo coordenadas...');

                const result = this.generateUpdateSQL();

                if (!result.success) {
                    console.error(result.message);
                    return;
                }

                // Exibir informações
                console.log(result.message);
                console.log('📍 URL:', result.url);
                console.log('📊 Coordenadas:', result.coordinates);
                console.log('');
                console.log('📝 Comando SQL gerado:');
                console.log('=' .repeat(50));
                console.log(result.sql);
                console.log('=' .repeat(50));

                // Copiar para clipboard
                await this.copyToClipboard(result.sql);
                console.log('');
                console.log('✅ Comando SQL copiado para o clipboard!');
                console.log('💡 Você pode colar diretamente no seu cliente SQL.');

                // Disponibilizar globalmente para acesso manual
                window.lastGeneratedSQL = result.sql;
                window.extractedCoordinates = result.coordinates;

                return result;

            } catch (error) {
                console.error('❌ Erro:', error.message);
                throw error;
            }
        }
    }

    // ========== EXECUÇÃO ==========
    const updater = new CoordinatesUpdater();
    updater.run();

})();

console.log('');
console.log('💡 Dicas:');
console.log('• O comando SQL foi copiado automaticamente');
console.log('• Use window.lastGeneratedSQL para acessar o último comando gerado');
console.log('• Use window.extractedCoordinates para ver as coordenadas extraídas');
