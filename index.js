#!/usr/bin/env node

import AxeBuilder from '@axe-core/webdriverjs';
import WebDriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import fs from 'fs';
import YAML from 'yaml';
import chalk from 'chalk';
import fileUrl from 'file-url';
import { createHtmlReport } from 'axe-html-reporter';
import { glob } from 'glob';
import { isValidUrl, baseParamObject, mergeDeep, getOutputDirPath, getOutputFileName } from './constants.js';

(async () => {
    console.log(chalk.blueBright('Welcome to Lets Validate Accessibility Tool.'));

    try {
        const configFile = fs.existsSync('./config.yaml') ? fs.readFileSync('./config.yaml', 'utf8') : fs.readFileSync('./dist/config.yaml', 'utf8');
        if (!configFile) {
            throw new Error('config.yaml file do not have valid configuration.');
        }
        const configData = await mergeDeep(baseParamObject, (await YAML.parse(configFile)));
        let htmlFiles = configData.config.filesToValidateA11y;
        if (configData.config.findHtmlFromHere && ignoreFileAndFolders) {
            htmlFiles = await glob(configData.config.findHtmlFromHere + '**/*.html');
            for (let igF of configData.config.ignoreFileAndFolders) {
                htmlFiles = htmlFiles.filter(item => !item.includes(igF))
            }
        }

        if (!htmlFiles.length) {
            throw new Error('Unable to find any file to execute scan.');
        }

        const chromeOptions = configData.config.headless ? new chrome.Options().addArguments('headless') : null;
        const outputDirPath = getOutputDirPath();
        const fileName = getOutputFileName();

        let count = 1;
        for (const file of htmlFiles) {
            const driver = await new WebDriver.Builder().forBrowser('chrome')
                .withCapabilities(WebDriver.Capabilities.chrome())
                .setChromeOptions(chromeOptions).build();
            const url = isValidUrl(file) ? file : (await fs.existsSync(file) ? await fileUrl(file) : false);
            console.log(chalk.greenBright('\nExecuting for URL ='));
            console.log(chalk.bgBlueBright(file));
            if (!url) {
                await driver.quit();
                throw new Error('File path not valid - ' + file);
            }

            await driver.get(url).then(async () => {
                await new AxeBuilder(driver).disableRules(configData.config.disableRules).analyze(async (err, results) => {
                    if (err) {
                        await driver.quit();
                        throw new Error(err.message);
                    }
                    if (await results && await results.violations.length > 0) {
                        let options = {
                            outputDir: `${outputDirPath}`,
                            reportFileName: `a11yReport_${fileName}_${count}.html`
                        };
                        await createHtmlReport({ results: results, options: options });
                        count++;
                    } else {
                        console.log(chalk.bgGreenBright(' ✔ Looks good here.'));
                    }
                });
                await driver.quit();
            });
        }
    } catch (e) {
        console.log(chalk.redBright("Exception: ", e.message));
    }
})();