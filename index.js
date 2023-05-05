import AxeBuilder from '@axe-core/webdriverjs';
import WebDriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import fs from 'fs';
import YAML from 'yaml';
import chalk from 'chalk';
import fileUrl from 'file-url';
import { createHtmlReport } from 'axe-html-reporter';
import { glob } from 'glob';
import { isValidUrl } from './constants.js';

(async () => {
    console.log(chalk.blueBright('Welcome to Lets Validate Accessibility Tool.'));

    try {
        const configFile = fs.existsSync('./config.yaml') ? fs.readFileSync('./config.yaml', 'utf8') : fs.readFileSync('./dist/config.yaml', 'utf8');
        const configData = YAML.parse(configFile);
        const htmlFiles = configData.config.findHtmlFromHere ? await glob(configData.config.findHtmlFromHere + '**/*.html', { ignore: ['node_modules'] }) : configData.config.filesToValidateA11y;
        // console.log('configData ', configData.config.filesToValidateA11y); return;
        const chromeOptions = configData.config.headless ? new chrome.Options().addArguments('headless') : null;

        const date = new Date();
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const outputDirPath = `artifacts/${dateString}`;
        const fileName = Math.random().toString().substring(2, 6);


        let count = 1;

        for (const file of htmlFiles) {
            const driver = await new WebDriver.Builder().forBrowser('chrome')
                .withCapabilities(WebDriver.Capabilities.chrome())
                .setChromeOptions(chromeOptions).build();
            const url = isValidUrl(file) ? file : (await fs.existsSync(file) ? await fileUrl(file) : false);
            console.log(chalk.greenBright('\nExecuting for url =\n'), file);
            //console.log('urlurlurlurl=', url)
            if (url) {
                await driver.get(url).then(async () => {
                    await new AxeBuilder(driver).disableRules(configData.config.disableRules).analyze(async (err, results) => {
                        if (err) {
                            console.log(chalk.redBright("Exception: ", err.message));
                        } else {
                            if (await results && await results.violations.length > 0) {
                                let options = {
                                    outputDir: `${outputDirPath}`,
                                    reportFileName: `a11yReport_${fileName}_${count}.html`
                                };
                                await createHtmlReport({ results: results, options: options });
                                count++;
                            } else {
                                console.log(chalk.bgGreenBright('All looks good.'));
                            }
                        }
                    });
                    await driver.quit();
                });
            } else {
                console.log(chalk.bgRedBright('File path not valid - ' + file));
            }
        }
    } catch (e) {
        console.log(chalk.redBright("Exception: ", e.message));
    }
})();