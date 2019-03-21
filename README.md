# myfirstvscodeextension README
This sample shows how to change the language mode to SynapseXML language. The sample uses the VS Code Extension API.

## Prerequisites
- Download and install the latest version of VS Code from [here](https://code.visualstudio.com/download)
- Node.js and npm
- Yeoman and vscode extension generator
     - `npm install -g yo generator-code`

## Generate VS Code Extension:
- Navigate to the directory where you want to create your VS Code extension
- Run the command and fill out a few fields
    - `yo code`
- Navigate to the extension folder and run the command
    - `code .`

## What's Inside

Following function will check tha namespace of the XML document, and will change the language mode to SynapseXML

```
function setLanguageToSynapse(document: any): boolean {
    let xmlData = document.getText();
    let synapseNSPattern = new RegExp("xmlns=\"http:\/\/ws\.apache\.org\/ns\/synapse\"");
    let response = synapseNSPattern.test(xmlData);

    if (response === true){
        vscode.languages.setTextDocumentLanguage(document, "SynapseXml");
        return true;
    }
    return false;
}
```

Following code snippet will show an information message if the Language mode succesfully changed to SynapseXML or an warning message if not.

```
let changeLanguage = vscode.workspace.onDidOpenTextDocument((document)=>{
        let changed = setLanguageToSynapse(document);
        if(changed) {
            vscode.window.showInformationMessage("Language Mode is changed to SynapseXML successfully");
        }else {
            vscode.window.showWarningMessage("Failed to change the language mode to SynapseXML");
        }
    });
```
It is Mandatory to update the package.json Extension Manifest file to as follows

Contribute definition of the SynapseXml language so that this will enrich the knowledge VS Code has about the SynapseXml language.

```
"languages": [
    {
        "id": "SynapseXML",
        "extensions": [".xml"]
    }
],
```
Note: Contribute a TextMate grammar to a language as follows. You must provide the **SynapseXml** as the language this grammar applies to, the TextMate **scopeName** for the grammar and the file path. You can find the XML grammar file in **/Synapse-VSCode-Extension-Demo/syntaxes/xml.tmLanguage.json**. Make sure you add this grammar file to the relevanr path in your project
```
"grammars": [
    {
        "language": "SynapseXml",
        "scopeName": "synapse.xml",
        "path": "./syntaxes/xml.tmLanguage.json"
    }
]
```

## VS Code API

### `vscode` module

- [`commands.registerCommand`](https://code.visualstudio.com/api/references/vscode-api#commands.registerCommand)
- [`workspace.onDidOpenTextDocument`](https://code.visualstudio.com/api/references/vscode-api#workspace.onDidOpenTextDocument)
- [`window.showInformationMessage`](https://code.visualstudio.com/api/references/vscode-api#window.showInformationMessage)
- [`window.showWarningMessage`](https://code.visualstudio.com/api/references/vscode-api#window.showWarningMessage)
- [`languages.setTextDocumentLanguage`](https://code.visualstudio.com/api/references/vscode-api#languages.setTextDocumentLanguage)

### Contribution Points

- [`contributes.commands`](https://code.visualstudio.com/api/references/contribution-points#contributes.commands)
- [`contributes.languages`](https://code.visualstudio.com/api/references/contribution-points#contributes.languages)
- [`contributes.grammars`](https://code.visualstudio.com/api/references/contribution-points#contributes.grammars)

### Activation Events
- [`onCommand`](https://code.visualstudio.com/api/references/activation-events#onCommand)

## Running the Sample

- Run `npm install` in terminal to install dependencies
- Run the `Run Extension` target in the Debug View. This will:
	- Start a task `npm: watch` to compile the code
	- Run the extension in a new VS Code window

## Useful Keybindings
| Description  | MacOS | Linux |
| ------------- | ------------- | ------------- |
| Show Command Palette  | Command+Shift+P  | Ctrl+Shift+P  |
| Quick Open/ Goto file  | Command+P  | Ctrl+P  |
| New window/instance  | Command+Shift+N  | Ctrl+Shift+N  |
| Close window  | Command+W  | Ctrl+W |
| Open file  | Command+O  | Ctrl+O  |
| New file | Command+N  | Ctrl+N  |
| Debug: Start/continue | F5  | F5  |
| Debug:Toggle Breakpoint | F9  | F9  |



  
