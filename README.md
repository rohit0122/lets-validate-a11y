# Let's Validate A11y [![NPM a11y package](https://img.shields.io/badge/node-v20.5.1-blue)](https://www.npmjs.com/package/lets-validate-a11y)

User-friendly and straightforward, enhanced by the "Let's Validate A11y" tool and supported by the AXE-Core CLI.

This tool enables you to assess accessibility issues across multiple URLs or files and produces a report in a user-friendly HTML format, allowing you to concentrate on resolving the identified problems.

## Installation

Use the package manager [npm](https://nodejs.org/en/download) to install Lets Lighthouse.

```bash
npm i lets-validate-a11y
```

## Simple setup

### The command provided below will create the necessary project folders and populate them with placeholder data.

```bash
  npm run init
```


## Heart of the project

To utilize this tool, you must modify the configuration structure outlined in the config.yaml file.

Generate a config.yaml file *(if it does not already exist)* alongside your project's package.json file.

***Note: _In YAML file, Whitespace indentation is used to indicate nesting and overall structure._***
Here is the read about [YAML](https://docs.fileformat.com/programming/yaml/#syntax)

```
config:
  #use when you want script to find html by itself using given path, default to false.
  #Example Value: /Users/rohit.shrivastava/Desktop/
  findHtmlFromHere: false
  ignoreFileAndFolders:
    - node_modules
    - example.html
    - test.com

  #skipped if above path is set. This parameter will help script to run only on given path/urls.
  filesToValidateA11y:
    - https://www.google.com
    - /Users/rohit.shrivastava/Desktop/test-file.html
    - /Users/rohit.shrivastava/Desktop/content/quizcontentfragment/element.html
  disableRules:
    - document-title
    - html-has-lang
    - landmark-one-main
    - page-has-heading-one
    - duplicate-id
  headless: true
```


## Usage

### Command 1

```bash
# Execute the below command to start accessibility analysis on
# multiple URLs/files(uses config.yaml)

  npm run analysis
```
The command provided will generate the *artifacts* directory within the root of your project.
All analyses are documented in HTML format, as illustrated in the attached screenshot.

<img width="226" alt="image" src="https://user-images.githubusercontent.com/6508575/236606037-7067cfe8-ee56-4d17-8229-f888c5f3f0ff.png">

Access the HTML Report to review the accessibility issues associated with specific URLs or files directly in your browser as outlined below.

<img width="1721" alt="image" src="https://user-images.githubusercontent.com/6508575/236606138-a6488302-7385-4005-8647-3ee697426012.png">

## Contributing

Contributions in the form of pull requests are encouraged. For significant modifications, please initiate a discussion by opening an issue to outline your proposed changes.

Kindly ensure that tests are updated as necessary.

## License

[MIT](https://choosealicense.com/licenses/mit/)
