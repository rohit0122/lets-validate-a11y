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