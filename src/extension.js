// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
'use strict';

const vscode = require('vscode');
const path = require('path');

const AppModel = require('./appModel').AppModel;
var getModelNames = require('./getModelNames').getModelsFromFiles;
// @ts-ignore
const precode = require("./precode.json");


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Mongo Snippets has been activated.');
	const appModel = new AppModel();
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let mongooseDocs = vscode.commands.registerCommand('extension.mongoosejsDocs', function () {
		// The code you place here will be executed every time your command is executed
		vscode.commands.executeCommand('vscode.open', vscode.Uri.parse('https://mongoosejs.com/docs/api.html#Model'))
	});

	let extensionDocs = vscode.commands.registerCommand('extension.extensionDocs', () => {

		vscode.commands.executeCommand('vscode.open', vscode.Uri.parse('https://github.com/roerohan/vscode-MongoSnippets-NodeJS/blob/master/README.md'))
	});


	let setup = vscode.commands.registerCommand('extension.setup', () => {
		let folderPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
		
		let indexContent = precode["index"].join("\n");
		let dbContent = precode["connect"].join("\n");
		let userModelContent = precode["user model"].join("\n");

		appModel.makefolders([
			path.join(folderPath, "models"),
			path.join(folderPath, "routes")
		]);

		appModel.makefiles([
			path.join(folderPath, "routes/index.js"),
			path.join(folderPath, "models/db.js"),
			path.join(folderPath, "models/user.model.js")
		],
		[
			indexContent,
			dbContent,
			userModelContent
		]);

	});

	var modelnames = [];
	setInterval(()=>{
		getModelNames().then((names)=>{
			let n = [];
			names.forEach(name => {
				n = n.concat(name.split(','));
			});
			modelnames = n;
			console.log(modelnames);
		}).catch(err=>{
			console.log(err+ "\nError");
		})
	}, 5000);

	let seeModels = vscode.commands.registerCommand('extension.seeModels', ()=>{
		if(modelnames)
		{
			vscode.window.showQuickPick(modelnames);
		}
		else{
			vscode.window.showErrorMessage("Models not found or still loading...")
		}
	});
	
	// to complete modelnames
	const provider1 = vscode.languages.registerCompletionItemProvider(
		{scheme:'file', language:'javascript'},
		{
			provideCompletionItems() {
				var items = [];
				modelnames.forEach(modelname => {
					let complete = new vscode.CompletionItem(modelname);
					complete.commitCharacters = ['.'];
					complete.kind = vscode.CompletionItemKind.Field;
					complete.detail = `Press '.' to get ${modelname}`;
					complete.documentation = new vscode.MarkdownString(`**Mongo Snippets: Model Name Suggestion - \`${modelname}.\`**`);
					items.push(complete);
				});
				return items;
			}
		}
	)

	// to complete after `modelnames.`
	const provider2 = vscode.languages.registerCompletionItemProvider(
		{scheme:'file', language:'javascript'},
		{
			provideCompletionItems(document, position) {
				var items = [];
				modelnames.forEach((modelname)=>{
					let linePrefix = document.lineAt(position).text.substr(0, position.character);
					if (!linePrefix.endsWith(`${modelname}.`)) {
						return undefined;
					}
					let complete = new vscode.CompletionItem("name"); // TODO
					items.push(complete);
				})
				return items
			}
		},
		'.'
	)
	
	// to complete within {}
	const provider3 = vscode.languages.registerCompletionItemProvider(
		{scheme:'file', language:'javascript'},
		{
			provideCompletionItems(document, position) {

				// get field names
				
				let startPos = document.positionAt(0);
				
				let range = new vscode.Range(startPos, position);
				let preText = document.getText(range);
				let openbraces = preText.split('{').length - 1;
				let closedbraces = preText.split('}').length - 1;
				if(openbraces <= closedbraces)
					return undefined

				return [
					new vscode.CompletionItem('name', vscode.CompletionItemKind.Field), // TODO
				];
			}
		}
	);

	context.subscriptions.push(mongooseDocs);
	context.subscriptions.push(extensionDocs);
	context.subscriptions.push(setup);
	context.subscriptions.push(seeModels);
	context.subscriptions.push(provider1, provider2, provider3);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
