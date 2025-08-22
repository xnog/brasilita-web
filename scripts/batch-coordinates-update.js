/**
 * Script para gerar comandos SQL de UPDATE em lote com coordenadas
 * 
 * Usage:
 * 1. Abra o console do navegador (F12) em qualquer página
 * 2. Cole este script inteiro
 * 3. Execute: batchProcessor.processUrls([array_de_urls])
 * 4. Os comandos SQL serão gerados e exibidos
 */

(function () {
    'use strict';

    class BatchCoordinatesProcessor {
        constructor() {
            this.results = [];
            this.currentIndex = 0;
        }

        // ========== EXTRAÇÃO DE COORDENADAS DE UMA URL ==========
        async extractCoordinatesFromUrl(url) {
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
                            let latitude = null;
                            let longitude = null;

                            // Buscar no config.multimediaCarrousel.map.src
                            if (iframeWindow.config && 
                                iframeWindow.config.multimediaCarrousel && 
                                iframeWindow.config.multimediaCarrousel.map) {
                                
                                const mapSrc = iframeWindow.config.multimediaCarrousel.map.src;
                                if (mapSrc) {
                                    const centerMatch = mapSrc.match(/center=([0-9.-]+)%2C([0-9.-]+)/);
                                    if (centerMatch) {
                                        latitude = parseFloat(centerMatch[1]);
                                        longitude = parseFloat(centerMatch[2]);
                                    }
                                }
                            }

                            // Remover iframe
                            document.body.removeChild(iframe);

                            resolve({
                                url: url,
                                latitude: latitude,
                                longitude: longitude,
                                success: latitude !== null && longitude !== null
                            });
                        }, 3000); // Aguardar 3 segundos

                    } catch (error) {
                        document.body.removeChild(iframe);
                        resolve({
                            url: url,
                            latitude: null,
                            longitude: null,
                            success: false,
                            error: error.message
                        });
                    }
                };

                iframe.onerror = () => {
                    document.body.removeChild(iframe);
                    resolve({
                        url: url,
                        latitude: null,
                        longitude: null,
                        success: false,
                        error: 'Erro ao carregar página'
                    });
                };

                document.body.appendChild(iframe);
                iframe.src = url;
            });
        }

        // ========== PROCESSAMENTO EM LOTE ==========
        async processUrls(urls) {
            console.clear();
            console.log('🚀 Iniciando processamento em lote...');
            console.log(`📊 Total de URLs: ${urls.length}`);
            console.log('');

            this.results = [];
            const sqlCommands = [];

            for (let i = 0; i < urls.length; i++) {
                const url = urls[i];
                console.log(`⏳ Processando ${i + 1}/${urls.length}: ${url}`);

                try {
                    const result = await this.extractCoordinatesFromUrl(url);
                    this.results.push(result);

                    if (result.success) {
                        // Gerar comando SQL
                        const escapedUrl = url.replace(/'/g, "''");
                        const sql = `UPDATE properties SET latitude = ${result.latitude}, longitude = ${result.longitude}, updated_at = NOW() WHERE original_url = '${escapedUrl}';`;
                        sqlCommands.push(sql);
                        
                        console.log(`✅ Sucesso: ${result.latitude}, ${result.longitude}`);
                        console.log(`   SQL: ${sql}`);
                    } else {
                        console.log(`❌ Falhou: ${result.error || 'Coordenadas não encontradas'}`);
                    }

                    // Aguardar entre requisições para não sobrecarregar
                    await new Promise(resolve => setTimeout(resolve, 1000));

                } catch (error) {
                    console.log(`❌ Erro: ${error.message}`);
                    this.results.push({
                        url: url,
                        latitude: null,
                        longitude: null,
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
                    console.log('⚠️ Não foi possível copiar automaticamente. Use window.lastBatchSQL');
                }

                // Disponibilizar globalmente
                window.lastBatchSQL = allSQL;
                window.lastBatchResults = this.results;
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

            console.log('📊 RELATÓRIO DETALHADO:');
            console.log('');

            const sqlCommands = [];

            this.results.forEach((result, index) => {
                console.log(`${index + 1}. ${result.url}`);
                if (result.success) {
                    console.log(`   ✅ Lat: ${result.latitude}, Lng: ${result.longitude}`);
                    
                    // Gerar comando SQL para este resultado
                    const escapedUrl = result.url.replace(/'/g, "''");
                    const sql = `UPDATE properties SET latitude = ${result.latitude}, longitude = ${result.longitude}, updated_at = NOW() WHERE original_url = '${escapedUrl}';`;
                    sqlCommands.push(sql);
                    
                } else {
                    console.log(`   ❌ ${result.error || 'Coordenadas não encontradas'}`);
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
                        console.log('⚠️ Não foi possível copiar automaticamente. Use window.reportSQL');
                    });
                } catch (err) {
                    console.log('⚠️ Não foi possível copiar automaticamente. Use window.reportSQL');
                }

                // Disponibilizar globalmente
                window.reportSQL = allSQL;
                
                console.log('');
                console.log('💡 Os comandos SQL também estão disponíveis em: window.reportSQL');
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
    window.batchProcessor = new BatchCoordinatesProcessor();

    console.log('🔧 Batch Processor carregado!');
    console.log('');
    console.log('💡 Como usar:');
    console.log('1. batchProcessor.processUrls([url1, url2, url3, ...])');
    console.log('2. batchProcessor.generateReport() - para ver relatório detalhado');
    console.log('');
    console.log('📝 Exemplo:');
    console.log('batchProcessor.processUrls([');
    console.log('  "https://www.idealista.it/immobile/12345",');
    console.log('  "https://www.idealista.it/immobile/67890"');
    console.log(']);');

})();