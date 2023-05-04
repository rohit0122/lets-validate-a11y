
/**
 * If you want to run in bulk, if `findHtmlFromHere` is set, config will run on that path.
 * Set to FALSE if you want to run for selected files.
 */
export const findHtmlFromHere =  '/Users/rohit.shrivastava/Documents/Projects/AARP/Repos/uxdia/ui.apps/src/main/content/jcr_root/apps/uxdia/';


/**
 * Varible `findHtmlFromHere` has priority, if you want to use script for selected file, set `findHtmlFromHere` to false.
 */
export const filesToVerify = [
    '/Users/rohit.shrivastava/Documents/Projects/AARP/Repos/uxdia/ui.apps/src/main/content/jcr_root/apps/uxdia/components/content/quizcontentfragment/quizcontentfragment.html',
    '/Users/rohit.shrivastava/Documents/Projects/AARP/Repos/uxdia/ui.apps/src/main/content/jcr_root/apps/uxdia/components/content/quizcontentfragment/element.html'
];

/**
 * Rules to ignore
 */
export const disableRules = [
    'document-title',
    'html-has-lang',
    'landmark-one-main',
    'page-has-heading-one'
];