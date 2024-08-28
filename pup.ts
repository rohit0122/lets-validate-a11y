import { AxePuppeteer } from '@axe-core/puppeteer';
import puppeteer, { Browser, Page } from 'puppeteer';

(async (): Promise<void> => {
    const browser: Browser = await puppeteer.launch({ headless: 'new' });
    const page: Page = await browser.newPage();
    await page.goto('https://dequeuniversity.com/demo/mars/');

    try {
        const results: any = await new AxePuppeteer(page).analyze();
        console.log(results);
    } catch (e: unknown) {
        // do something with the error
    }

    await browser.close();
})();