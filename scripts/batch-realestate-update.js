/**
 * Script para gerar comandos SQL de UPDATE em lote com nomes das imobiliárias
 * 
 * Usage:
 * 1. Abra o console do navegador (F12) em qualquer página
 * 2. Cole este script inteiro
 * 3. Execute: realEstateProcessor.processUrls([array_de_urls])
 * 4. Os comandos SQL serão gerados e exibidos
 */

(function () {
    'use strict';

    class BatchRealEstateProcessor {
        constructor() {
            this.results = [];
            this.currentIndex = 0;
        }

        // ========== EXTRAÇÃO DE NOME DA IMOBILIÁRIA DE UMA URL ==========
        async extractRealEstateFromUrl(url) {
            return new Promise((resolve) => {
                // Criar iframe oculto para carregar a página
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.style.width = '1px';
                iframe.style.height = '1px';
                
                iframe.onload = () => {
                    try {
                        const iframeWindow = iframe.contentWindow;
                        const iframeDocument = iframe.contentDocument;

                        // Aguardar um pouco para garantir que os scripts carregaram
                        setTimeout(() => {
                            let realEstate = null;

                            // 1. PRINCIPAL: Buscar no objeto config global (adFirstName)
                            if (iframeWindow.config && iframeWindow.config.adFirstName) {
                                const name = iframeWindow.config.adFirstName.trim();
                                if (name.length > 3 && !name.includes('Profissional')) {
                                    realEstate = this.decodeHtmlEntities(name);
                                }
                            }

                            // 2. Fallback: adCommercialName no config
                            if (!realEstate && iframeWindow.config && iframeWindow.config.adCommercialName) {
                                const name = iframeWindow.config.adCommercialName.trim();
                                if (name.length > 3 && !name.includes('Profissional')) {
                                    realEstate = this.decodeHtmlEntities(name);
                                }
                            }

                            // 3. Fallback: input hidden com name="user-name"
                            if (!realEstate) {
                                const userNameInput = iframeDocument.querySelector('input[name="user-name"]');
                                if (userNameInput) {
                                    const value = userNameInput.getAttribute('value');
                                    if (value && value.length > 3 && !value.includes('Profissional')) {
                                        realEstate = this.decodeHtmlEntities(value);
                                    }
                                }
                            }

                            // 4. Fallback: elemento .advertiser-name
                            if (!realEstate) {
                                const advertiserNameElement = iframeDocument.querySelector('.advertiser-name');
                                if (advertiserNameElement) {
                                    const text = advertiserNameElement.textContent.trim();
                                    if (text.length > 3 && !text.includes('Profissional')) {
                                        realEstate = this.decodeHtmlEntities(text);
                                    }
                                }
                            }

                            // 5. Fallback: elemento .about-advertiser-name
                            if (!realEstate) {
                                const aboutAdvertiserNameElement = iframeDocument.querySelector('.about-advertiser-name');
                                if (aboutAdvertiserNameElement) {
                                    const text = aboutAdvertiserNameElement.textContent.trim();
                                    if (text.length > 3 && !text.includes('Profissional')) {
                                        realEstate = this.decodeHtmlEntities(text);
                                    }
                                }
                            }

                            // Remover iframe
                            document.body.removeChild(iframe);

                            resolve({
                                url: url,
                                realEstate: realEstate,
                                success: realEstate !== null && realEstate.length > 0
                            });
                        }, 3000); // Aguardar 3 segundos

                    } catch (error) {
                        document.body.removeChild(iframe);
                        resolve({
                            url: url,
                            realEstate: null,
                            success: false,
                            error: error.message
                        });
                    }
                };

                iframe.onerror = () => {
                    document.body.removeChild(iframe);
                    resolve({
                        url: url,
                        realEstate: null,
                        success: false,
                        error: 'Erro ao carregar página'
                    });
                };

                document.body.appendChild(iframe);
                iframe.src = url;
            });
        }

        // Método helper para decodificar entidades HTML
        decodeHtmlEntities(text) {
            const entities = {
                '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
                '&aacute;': 'á', '&eacute;': 'é', '&iacute;': 'í', '&oacute;': 'ó', '&uacute;': 'ú',
                '&ccedil;': 'ç', '&atilde;': 'ã', '&otilde;': 'õ', '&ocirc;': 'ô',
                '&Aacute;': 'Á', '&Eacute;': 'É', '&Iacute;': 'Í', '&Oacute;': 'Ó', '&Uacute;': 'Ú',
                '&Ccedil;': 'Ç', '&Atilde;': 'Ã', '&Otilde;': 'Õ', '&euro;': '€', '&nbsp;': ' '
            };
            return text.replace(/&[^;]+;/g, (match) => entities[match] || match);
        }

        // ========== PROCESSAMENTO EM LOTE ==========
        async processUrls(urls) {
            console.clear();
            console.log('🏢 Iniciando processamento em lote das imobiliárias...');
            console.log(`📊 Total de URLs: ${urls.length}`);
            console.log('');

            this.results = [];
            const sqlCommands = [];

            for (let i = 0; i < urls.length; i++) {
                const url = urls[i];
                console.log(`⏳ Processando ${i + 1}/${urls.length}: ${url}`);

                try {
                    const result = await this.extractRealEstateFromUrl(url);
                    this.results.push(result);

                    if (result.success) {
                        // Gerar comando SQL
                        const escapedUrl = url.replace(/'/g, "''");
                        const escapedRealEstate = result.realEstate.replace(/'/g, "''");
                        const sql = `UPDATE property SET "realEstate" = '${escapedRealEstate}', "updatedAt" = NOW() WHERE "originalUrl" = '${escapedUrl}';`;
                        sqlCommands.push(sql);
                        
                        console.log(`✅ Sucesso: ${result.realEstate}`);
                        console.log(`   SQL: ${sql}`);
                    } else {
                        console.log(`❌ Falhou: ${result.error || 'Nome da imobiliária não encontrado'}`);
                    }

                    // Aguardar entre requisições para não sobrecarregar
                    await new Promise(resolve => setTimeout(resolve, 1000));

                } catch (error) {
                    console.log(`❌ Erro: ${error.message}`);
                    this.results.push({
                        url: url,
                        realEstate: null,
                        success: false,
                        error: error.message
                    });
                }
            }

            // Exibir resumo
            const successful = this.results.filter(r => r.success).length;
            const failed = this.results.length - successful;

            console.log('');
            console.log('📈 RESUMO:');
            console.log(`✅ Sucessos: ${successful}`);
            console.log(`❌ Falhas: ${failed}`);
            console.log('');

            if (sqlCommands.length > 0) {
                console.log('📝 COMANDOS SQL GERADOS:');
                console.log('=' .repeat(70));
                sqlCommands.forEach(sql => console.log(sql));
                console.log('=' .repeat(70));

                // Copiar todos os comandos para clipboard
                const allSQL = sqlCommands.join('\n');
                try {
                    await navigator.clipboard.writeText(allSQL);
                    console.log('✅ Todos os comandos SQL copiados para o clipboard!');
                } catch (err) {
                    console.log('⚠️ Não foi possível copiar automaticamente. Use window.lastRealEstateSQL');
                }

                // Disponibilizar globalmente
                window.lastRealEstateSQL = allSQL;
                window.lastRealEstateResults = this.results;
            }

            return {
                results: this.results,
                sqlCommands: sqlCommands,
                summary: { successful, failed, total: urls.length }
            };
        }

        // ========== GERAR RELATÓRIO ==========
        generateReport() {
            if (this.results.length === 0) {
                console.log('❌ Nenhum resultado disponível. Execute processUrls() primeiro.');
                return;
            }

            console.log('📊 RELATÓRIO DETALHADO DE IMOBILIÁRIAS:');
            console.log('');

            const sqlCommands = [];

            this.results.forEach((result, index) => {
                console.log(`${index + 1}. ${result.url}`);
                if (result.success) {
                    console.log(`   ✅ Imobiliária: ${result.realEstate}`);
                    
                    // Gerar comando SQL para este resultado
                    const escapedUrl = result.url.replace(/'/g, "''");
                    const escapedRealEstate = result.realEstate.replace(/'/g, "''");
                    const sql = `UPDATE properties SET real_estate = '${escapedRealEstate}', updated_at = NOW() WHERE original_url = '${escapedUrl}';`;
                    sqlCommands.push(sql);
                    
                } else {
                    console.log(`   ❌ ${result.error || 'Nome da imobiliária não encontrado'}`);
                }
                console.log('');
            });

            // Exibir comandos SQL apenas para os sucessos
            if (sqlCommands.length > 0) {
                console.log('');
                console.log('📝 COMANDOS SQL PARA ATUALIZAÇÃO:');
                console.log('=' .repeat(70));
                sqlCommands.forEach((sql, index) => {
                    console.log(`-- Comando ${index + 1}`);
                    console.log(sql);
                    console.log('');
                });
                console.log('=' .repeat(70));

                // Copiar comandos SQL para clipboard
                const allSQL = sqlCommands.join('\n');
                try {
                    navigator.clipboard.writeText(allSQL).then(() => {
                        console.log('✅ Comandos SQL copiados para o clipboard!');
                    }).catch(() => {
                        console.log('⚠️ Não foi possível copiar automaticamente. Use window.reportRealEstateSQL');
                    });
                } catch (err) {
                    console.log('⚠️ Não foi possível copiar automaticamente. Use window.reportRealEstateSQL');
                }

                // Disponibilizar globalmente
                window.reportRealEstateSQL = allSQL;
                
                console.log('');
                console.log('💡 Os comandos SQL também estão disponíveis em: window.reportRealEstateSQL');
            }

            return {
                results: this.results,
                sqlCommands: sqlCommands,
                summary: {
                    total: this.results.length,
                    successful: this.results.filter(r => r.success).length,
                    failed: this.results.filter(r => !r.success).length
                }
            };
        }
    }

    // Disponibilizar globalmente
    window.realEstateProcessor = new BatchRealEstateProcessor();

    console.log('🏢 Real Estate Processor carregado!');
    console.log('');
    console.log('💡 Como usar:');
    console.log('1. realEstateProcessor.processUrls([url1, url2, url3, ...])');
    console.log('2. realEstateProcessor.generateReport() - para ver relatório detalhado');
    console.log('');
    console.log('📝 Exemplo:');
    console.log('realEstateProcessor.processUrls([');
    console.log('  "https://www.idealista.it/immobile/12345",');
    console.log('  "https://www.idealista.it/immobile/67890"');
    console.log(']);');

})();
