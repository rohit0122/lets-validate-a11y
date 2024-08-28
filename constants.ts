export const isValidUrl = (urlString: string): boolean => {
    const urlPattern: RegExp = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

export const baseParamObject: { config: { findHtmlFromHere: boolean; ignoreFileAndFolders: string[]; filesToValidateA11y: string[]; disableRules: string[]; headless: boolean; } } = {
    config: {
        findHtmlFromHere: false,
        ignoreFileAndFolders: [],
        filesToValidateA11y: ['https://example.com/'],
        disableRules: [],
        headless: false
    }
}
export const mergeDeep = (targetObject: Record<string, any> = {}, sourceObject: Record<string, any> = {}): Record<string, any> => {
    const copyTargetObject: Record<string, any> = JSON.parse(JSON.stringify(targetObject));
    const copySourceObject: Record<string, any> = JSON.parse(JSON.stringify(sourceObject));
    Object.keys(copySourceObject).forEach((key: string) => {
        if (typeof copySourceObject[key] === "object" && !Array.isArray(copySourceObject[key])) {
            copyTargetObject[key] = mergeDeep(
                copyTargetObject[key],
                copySourceObject[key]
            );
        } else {
            copyTargetObject[key] = copySourceObject[key];
        }
    });

    return copyTargetObject;
}

export const getOutputDirPath = (): string => {
    const date: Date = new Date();
    const dateString: string = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return `artifacts/${dateString}`;
}

export const getOutputFileName = (): string => {
    return Math.random().toString().substring(2, 6);
}

export const getA11yScore = async (results: any): Promise<number> => {
    let a11yScore: number = 0;
    if (await results && await results.violations.length > 0) {
        let dataToCalculate: { critical: number; serious: number; moderate: number; minor: number; total: number; } = {
            critical: 0,
            serious: 0,
            moderate: 0,
            minor: 0,
            total: 0,
        };
        for (let item of results.violations) {
            dataToCalculate[item.impact] = dataToCalculate[item.impact] + item.nodes.length;
            dataToCalculate['total'] = dataToCalculate['total'] + item.nodes.length;
        }

        a11yScore = a11yFormulaByAxe(dataToCalculate);
    }
    return a11yScore;
}

const a11yFormulaByAxe = (dataToCalculate: { critical: number; serious: number; moderate: number; minor: number; total: number; }): number => {
    const p0: number = dataToCalculate.minor;
    const p1: number = dataToCalculate.moderate;
    const p2: number = dataToCalculate.critical + dataToCalculate.serious;
    const totalViolation: number = dataToCalculate.total;
    return parseInt((((0.4 * p2) + (0.8 * p1) + p0) / totalViolation) * 100);
}

export const searchAndAddA11yScore = (fileData: string, a11yScore: number): string => {
    let t: number = 0;
    return fileData.replace(/Axe-core® Accessibility Results/g, match => ++t === 2 ? `Axe-core® Accessibility Results <div class="alert alert-primary text-center h2">Page Accessibility Score <span class="badge badge-primary">${a11yScore}</span></div>` : match);
}