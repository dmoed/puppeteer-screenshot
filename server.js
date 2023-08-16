const puppeteer = require('puppeteer');
const isUrlHttp = require('is-url-http');
const express = require('express')
const app = express()
const port = parseInt(process.env.PORT) || 3000;

app.get('/screenshot', async (req, res) => {

    //params
    let site_url = req.query.site_url
    let full_page = req.query.full_page

    if (typeof site_url !== "string" || site_url.trim().length < 1) {
        return res.status(400).json({
            'error': 'please provide a site_url',
            'params': {
                'site_url': site_url,
                'full_page': full_page,
            }
        })
    }

    if (isUrlHttp(site_url) === false) {
        return res.status(400).json({
            'error': 'site_url param is not a valid URL',
            'params': {
                'site_url': site_url,
                'full_page': full_page,
            }
        })
    }

    try {

        const browser = await puppeteer.launch({
            executablePath: '/usr/bin/google-chrome-stable',
            headless: 'new',
            args: [
                '--autoplay-policy=user-gesture-required',
                '--disable-background-networking',
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-breakpad',
                '--disable-client-side-phishing-detection',
                '--disable-component-update',
                '--disable-default-apps',
                '--disable-dev-shm-usage',
                '--disable-domain-reliability',
                '--disable-extensions',
                '--disable-features=AudioServiceOutOfProcess',
                '--disable-hang-monitor',
                '--disable-ipc-flooding-protection',
                '--disable-notifications',
                '--disable-offer-store-unmasked-wallet-cards',
                '--disable-popup-blocking',
                '--disable-print-preview',
                '--disable-prompt-on-repost',
                '--disable-renderer-backgrounding',
                '--disable-setuid-sandbox',
                '--disable-speech-api',
                '--disable-sync',
                '--hide-scrollbars',
                '--ignore-gpu-blacklist',
                '--metrics-recording-only',
                '--mute-audio',
                '--no-default-browser-check',
                '--no-first-run',
                '--no-sandbox',
                '--no-zygote',
                '--password-store=basic',
                '--use-gl=swiftshader',
                '--use-mock-keychain',
            ]
        });
        const page = await browser.newPage();

        // Set viewport width and height
        await page.setViewport({width: 1920, height: 1080});

        // Open URL in current page
        await page.goto(site_url, {waitUntil: 'networkidle0', timeout: 600000});

        // Capture screenshot
        let screenshotOptions = {}

        if (!!full_page === true) {
            screenshotOptions.fullPage = true
        }

        const img = await page.screenshot(screenshotOptions);

        // Close the browser instance
        await browser.close();

        res.set('Content-Type', 'image/jpg');
        res.send(img);

    } catch (error) {

        console.log(error);

        return res.status(400).json({
            'error': error,
        })
    }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})