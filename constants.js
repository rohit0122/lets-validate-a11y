export const isValidUrl = urlString => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

export const baseParamObject = {
    config: {
        findHtmlFromHere: false,
        ignoreFileAndFolders: [],
        filesToValidateA11y: ['https://example.com/'],
        disableRules: [],
        headless: false
    }
}

/**
 * This function will accept the two objects as arguments and return the object of deeply 
 * merged with nested properties.
 * @param {object} targetObject objects containing the properties to be merged with source.
 * @param {object} sourceObject objects containing the properties you want to apply.
 * @return {object} return the deeply merged objects
 */
export const mergeDeep = (targetObject = {}, sourceObject = {}) => {
    // clone the source and target objects to avoid the mutation
    const copyTargetObject = JSON.parse(JSON.stringify(targetObject));
    const copySourceObject = JSON.parse(JSON.stringify(sourceObject));
    // Iterating through all the keys of source object
    Object.keys(copySourceObject).forEach((key) => {
        if (typeof copySourceObject[key] === "object" && !Array.isArray(copySourceObject[key])) {
            // If property has nested object, call the function recursively
            copyTargetObject[key] = mergeDeep(
                copyTargetObject[key],
                copySourceObject[key]
            );
        } else {
            // else merge the object source to target
            copyTargetObject[key] = copySourceObject[key];
        }
    });

    return copyTargetObject;
}

export const getOutputDirPath = () => {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return `artifacts/${dateString}`;
}

export const getOutputFileName = () => {
    return Math.random().toString().substring(2, 6);
}

export const getA11yScore = async (results) => {
    let a11yScore = 0;
    if (await results && await results.violations.length > 0) {
        let dataToCalculate = {
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

        a11yScore = await a11yFormulaByAxe(dataToCalculate);
        //console.log('Data to calculate=====', dataToCalculate);
        //console.log(chalk.bgCyanBright('A11y score calculated as=====', a11yScore));
    }
    return a11yScore;
}

const a11yFormulaByAxe = (dataToCalculate) => {
    /*
            A11y score calculation formula
          * p2 = 1  //number of Critical and Serious issues
          * p1 = 59 //number of Moderate issues
          * p0 = 4 //number of Minor issues
          * total = 64 //number of total issues
          Formula====== ( 0.4 * p2 + 0.8 * p1 + p0 ) / total
    */
    const p0 = dataToCalculate.minor;
    const p1 = dataToCalculate.moderate;
    const p2 = dataToCalculate.critical + dataToCalculate.serious;
    const totalViolation = dataToCalculate.total;
    return parseInt((((0.4 * p2) + (0.8 * p1) + p0) / totalViolation) * 100);

}

export const searchAndAddA11yScore = (fileData, a11yScore)=>{
    // replace 2nd occurance 
    let t = 0;
    return fileData.replace(/AXE Accessibility Results/g, match => ++t === 2 ? `AXE Accessibility Results <h1>Page Accessibility Score <span class="badge badge-primary">${a11yScore}</span></h1>` : match);
}