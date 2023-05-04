import AxeBuilder from '@axe-core/webdriverjs';
import WebDriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

import fileUrl from 'file-url';
import { createHtmlReport } from 'axe-html-reporter';
import { disableRules, filesToVerify, findHtmlFromHere } from './config.js';
import { glob } from 'glob';

(async () => {
    const htmlFiles = findHtmlFromHere ? await glob(findHtmlFromHere + '**/*.html', { ignore: ['node_modules'] }) : filesToVerify;

    let count = 1;
    for (const file of htmlFiles) {
        const driver = new WebDriver.Builder().forBrowser('chrome').withCapabilities(WebDriver.Capabilities.chrome())
        .setChromeOptions(new chrome.Options().addArguments('headless')).build();
        const url = await fileUrl(file);
        console.log('\nExecuting for url = \n', url)
        await driver.get(url).then(async () => {
            await new AxeBuilder(driver).disableRules(disableRules).analyze(async (err, results) => {
                if (err) {
                    // Handle error somehow
                    console.log('Error: ', err.message);
                }
                //console.log(results);
                if (await results && await results.violations.length > 0) {
                    let options = { reportFileName: 'accessibilityReport_' + count + '.html' };
                    await createHtmlReport({ results: results, options: options });
                    count++;
                }else{
                    console.log('Looks good.')
                }
                await driver.quit();
            });
        });
    }
})();