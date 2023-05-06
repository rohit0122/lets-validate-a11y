# Lets Validate A11y

Convenience & ease to use, powered by the "Let's Validate A11y" tool and backed by the AXE-Core CLI.

This tool helps you to validate the accessibility issues for batch URLs/files & generate the report in user-readable HTML format so you more focus on fixing it.

## Installation

Use the package manager [npm](https://nodejs.org/en/download) to install Lets Lighthouse.

```bash
npm i lets-validate-a11y
```

## Simple setup

### Now edit your project's package.json and add following scripts to it.

```
"scripts": {
    "init": "lets-init",
    "analysis": "lets-analysis"
  }
```
### Below command will generate the project required folders and furnished them with dummy data.

```bash
  npm run init
```


## Heart of the project

To use this tool, you will need to edit the following configuration structure in config.yaml file
Create config.yaml file *(if not exits)* in parallel to your project's package.json file.

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
The above command will create the *artifcats* folder under your project root
with all the analysis reported in HTMLs like as follows, refer screenshot:

<img width="226" alt="image" src="https://user-images.githubusercontent.com/6508575/236606037-7067cfe8-ee56-4d17-8229-f888c5f3f0ff.png">

Open the HTML Report and you can read the accessibility issues for individual URL/file on the browser as follows:

<img width="1721" alt="image" src="https://user-images.githubusercontent.com/6508575/236606138-a6488302-7385-4005-8647-3ee697426012.png">

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
