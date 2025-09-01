#!/usr/bin/env node

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

/**
 * Downloads HTML content from a URL while simulating a real browser
 * @param {string} url - The URL to download from
 * @param {string} outputPath - Path where to save the HTML file
 * @param {Object} options - Additional options
 */
async function downloadHTML(url, outputPath, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            const parsedUrl = new URL(url);
            const isHttps = parsedUrl.protocol === 'https:';
            const client = isHttps ? https : http;

            // Realistic browser headers to bypass basic bot detection
            const headers = {
                'User-Agent': options.userAgent || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
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
                'Cache-Control': 'max-age=0',
                ...options.headers
            };

            const requestOptions = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || (isHttps ? 443 : 80),
                path: parsedUrl.pathname + parsedUrl.search,
                method: 'GET',
                headers: headers,
                timeout: options.timeout || 30000
            };

            console.log(`Downloading HTML from: ${url}`);
            console.log(`Saving to: ${outputPath}`);

            const req = client.request(requestOptions, (res) => {
                let data = '';

                // Handle redirects
                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    console.log(`Redirecting to: ${res.headers.location}`);
                    const redirectUrl = new URL(res.headers.location, url).href;
                    return downloadHTML(redirectUrl, outputPath, options)
                        .then(resolve)
                        .catch(reject);
                }

                if (res.statusCode !== 200) {
                    reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
                    return;
                }

                // Handle gzip/deflate encoding
                let stream = res;
                if (res.headers['content-encoding'] === 'gzip') {
                    const zlib = require('zlib');
                    stream = res.pipe(zlib.createGunzip());
                } else if (res.headers['content-encoding'] === 'deflate') {
                    const zlib = require('zlib');
                    stream = res.pipe(zlib.createInflate());
                }

                stream.on('data', (chunk) => {
                    data += chunk;
                });

                stream.on('end', () => {
                    try {
                        // Ensure output directory exists
                        const outputDir = path.dirname(outputPath);
                        if (!fs.existsSync(outputDir)) {
                            fs.mkdirSync(outputDir, { recursive: true });
                        }

                        // Save HTML to file
                        fs.writeFileSync(outputPath, data, 'utf8');

                        console.log(`✅ Successfully downloaded HTML (${data.length} characters)`);
                        console.log(`📁 Saved to: ${outputPath}`);

                        resolve({
                            url: url,
                            outputPath: outputPath,
                            size: data.length,
                            statusCode: res.statusCode,
                            headers: res.headers
                        });
                    } catch (error) {
                        reject(new Error(`Failed to save file: ${error.message}`));
                    }
                });

                stream.on('error', (error) => {
                    reject(new Error(`Stream error: ${error.message}`));
                });
            });

            req.on('error', (error) => {
                reject(new Error(`Request error: ${error.message}`));
            });

            req.on('timeout', () => {
                req.destroy();
                reject(new Error('Request timeout'));
            });

            req.end();
        } catch (error) {
            reject(new Error(`Invalid URL or configuration: ${error.message}`));
        }
    });
}

// CLI usage
async function main() {
    const args = process.argv.slice(2);

    if (args.length < 1) {
        console.log(`
Usage: node download-html.js <URL> [output-file] [options]

Arguments:
  URL           The URL to download HTML from
  output-file   Output file path (optional, defaults to downloaded.html)

Options:
  --user-agent  Custom user agent string
  --timeout     Request timeout in milliseconds (default: 30000)
  --headers     Additional headers as JSON string

Examples:
  node download-html.js https://example.com
  node download-html.js https://example.com my-page.html
  node download-html.js https://example.com page.html --timeout 60000
  node download-html.js https://example.com page.html --user-agent "Custom Bot 1.0"
  node download-html.js https://example.com page.html --headers '{"Referer":"https://google.com"}'
`);
        process.exit(1);
    }

    const url = args[0];
    const outputPath = args[1] || 'downloaded.html';

    // Parse additional options
    const options = {};
    for (let i = 2; i < args.length; i += 2) {
        const flag = args[i];
        const value = args[i + 1];

        switch (flag) {
            case '--user-agent':
                options.userAgent = value;
                break;
            case '--timeout':
                options.timeout = parseInt(value);
                break;
            case '--headers':
                try {
                    options.headers = JSON.parse(value);
                } catch (e) {
                    console.error('Invalid JSON for headers:', e.message);
                    process.exit(1);
                }
                break;
        }
    }

    try {
        const result = await downloadHTML(url, outputPath, options);
        console.log('\n🎉 Download completed successfully!');
        console.log(`📊 Status: ${result.statusCode}`);
        console.log(`📏 Size: ${result.size} characters`);
        console.log(`🔗 URL: ${result.url}`);
        console.log(`💾 File: ${result.outputPath}`);
    } catch (error) {
        console.error('❌ Download failed:', error.message);
        process.exit(1);
    }
}

// Export for programmatic use
module.exports = { downloadHTML };

// Run CLI if called directly
if (require.main === module) {
    main();
}
