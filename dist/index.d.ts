export declare const isValidUrl: (urlString: string) => boolean;
export declare const baseParamObject: {
    config: {
        findHtmlFromHere: boolean;
        ignoreFileAndFolders: string[];
        filesToValidateA11y: string[];
        disableRules: string[];
        headless: boolean;
    };
};
export declare const mergeDeep: (targetObject?: Record<string, any>, sourceObject?: Record<string, any>) => Record<string, any>;
export declare const getOutputDirPath: () => string;
export declare const getOutputFileName: () => string;
export declare const getA11yScore: (results: any) => Promise<number>;
export declare const searchAndAddA11yScore: (fileData: string, a11yScore: number) => string;
