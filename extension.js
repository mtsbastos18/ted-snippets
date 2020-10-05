// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require("fs");
const path = require("path");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tedsenac" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('tedsenac.criaHTML', function () {
		const folderPath = getCurrentWorkspaceFolder();
		if (!folderPath) {
			vscode.window.showErrorMessage('Selecione um workspace!');
			return;
		}

		fs.writeFile(path.join(folderPath, "index.html"), generateHTML(), err => {
			if (err) {
			  return vscode.window.showErrorMessage(
				"Falha na criação do arquivo HTML"
			  );
			}
			vscode.window.showInformationMessage(
			  "HTML criado com sucesso"
			);
		});
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}


function generateHTML() {
	return (
	  `<!DOCTYPE html>
	   <html lang="en">
		 <head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Meu HTML</title>
		<link rel="stylesheet" href="app.css" />
		 </head>
		 <body>
		   <script src="app.js"></script>
		 </body>
	   </html>`
	);
  }

  function getCurrentWorkspaceFolder() {
	try {
	  return vscode
		.workspace
		.workspaceFolders[0]
		.uri
		.toString()
		.split(":")[1];
	} catch (error) {
	  console.error(error);
	  return '';
	}
  }