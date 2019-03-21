// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "myfirstvscodeextension" is now active!');

	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World!');
	});

	let changeLanguage = vscode.workspace.onDidOpenTextDocument((document)=>{
		let changed = setLanguageToSynapse(document);
		if(changed) {
			vscode.window.showInformationMessage("Language Mode is changed to SynapseXML successfully");
		}else {
			vscode.window.showWarningMessage("Failed to change the language mode to SynapseXML");
		}
	});

	context.subscriptions.push(changeLanguage);
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function setLanguageToSynapse(document: any): boolean {
	let xmlData = document.getText();
	let synapseNSPttern = new RegExp("xmlns=\"http:\/\/ws\.apache\.org\/ns\/synapse\"");
	let response = synapseNSPttern.test(xmlData);

	if (response === true){
		vscode.languages.setTextDocumentLanguage(document, "SynapseXml");
		return true;
	}
	return false;
}
