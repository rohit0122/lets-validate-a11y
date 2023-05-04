
/**
 * If you want to run in bulk, if `findHtmlFromHere` is set, config will run on that path.
 * Set to FALSE if you want to run for selected files.
 */
export const findHtmlFromHere =  '/users/rohit.shrivastava/documents/projects/my-codebase/';


/**
 * Varible `findHtmlFromHere` has priority, if you want to use script for selected file, set `findHtmlFromHere` to false.
 */
export const filesToVerify = [
    '/users/rohit.shrivastava/documents/projects/my-codebase/quizcontentfragment/quizcontentfragment.html',
    '/users/rohit.shrivastava/documents/projects/my-codebase/quizcontentfragment/element.html'
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