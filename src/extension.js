// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
'use strict';

const vscode = require('vscode');
const path = require('path');

const AppModel = require('./boilerplate/appModel').AppModel;
const getModelNames = require('./suggestions/getModelNames');
var getModelsFromFiles = getModelNames.getModelsFromFiles;
var getFieldNames = getModelNames.getFieldNames;
const showDB = require('./connect/showDB');
const listAllConnections = showDB.listAllCollections;
const listDocs = showDB.listDocs;

// @ts-ignore
const precode = require('./boilerplate/precode.json');
var repeatTime = 0;
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
	var models = {};
	var fieldnames = [];
	setInterval(() => {
		getModelsFromFiles().then(async (names) => {
			let n = [];
			let m = {};
			names.forEach(name => {
				let temp = name["name"].split(',');
				temp.forEach((t, i) => {
					m[t] = {
						'file': name.file
					};
					temp[i] = {
						label: `$(star-delete) ${t}`,
						detail: `$(file-code) Defined in ${name.file}, select to open.`,
					};
				});
				n = n.concat(temp);
			});
			modelnames = n;
			models = m;
			fieldnames = await getFieldNames(models);
		}).catch(err => {
			console.error(err + "\nError");
		});
	}, repeatTime); // Executes without waiting for the first time

	repeatTime = 5000; // Set interval to 5 seconds


	let seeModels = vscode.commands.registerCommand('extension.seeModels', async () => {
		if (modelnames != null && modelnames.length > 0) {
			var val = await vscode.window.showQuickPick(modelnames, {
				placeHolder: 'Select a model to open it\'s source file...'
			});
			if (!val)
				return;
			var filePath = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, 'models', models[val['label'].split(' ')[1]]['file']);
			vscode.workspace.openTextDocument(filePath).then(async (doc) => {
				vscode.window.showTextDocument(doc).then((editor) => {
					var text = doc.getText();
					let match = RegExp(val['label'].split(' ')[1]).exec(text);
					let startPos = doc.positionAt(match.index);
					let endPos = doc.positionAt(match.index + match[0].length);
					editor.selection = new vscode.Selection(startPos, endPos);
					editor.revealRange(editor.selection, vscode.TextEditorRevealType.Default);
				});
			});
		} else {
			vscode.window.showWarningMessage("Looking for models...");
		}
	});

	let viewCollections = vscode.commands.registerCommand('extension.viewCollections', async () => {

		var dbname = await vscode.window.showInputBox({
			placeHolder: "Enter a connection string to the database.",
			value: "mongodb://",
			ignoreFocusOut: true,
			prompt: "Valid connection strings usually begin with 'mongodb://'."
		});
		if(!dbname) return;

		try{
			var items = await listAllConnections(dbname);
			var choice = await vscode.window.showQuickPick(items, {
				placeHolder: 'Choose a Collection:'
			})

			if(!choice) return;

			var docs = await listDocs(dbname, choice);
			const newFile = vscode.Uri.parse('untitled:' + path.join(vscode.workspace.rootPath, `${choice}.json`));
			vscode.workspace.openTextDocument(newFile).then(document => {
				const edit = new vscode.WorkspaceEdit();
				var display = JSON.stringify(docs, null, "\t");
				// const MarkdownString = new vscode.CodeLens()
				edit.insert(newFile, new vscode.Position(1, 0), display);
				return vscode.workspace.applyEdit(edit).then(success => {
					if (success) {
						vscode.window.showTextDocument(document);
					} else {
						vscode.window.showErrorMessage('Unexpected Failure! Could not write to file.');
					}
				});
			});
		}
		catch(err){
			vscode.window.showErrorMessage(err);
		}
	});

	// to complete modelnames
	const provider1 = vscode.languages.registerCompletionItemProvider({
		scheme: 'file',
		language: 'javascript'
	}, {
		provideCompletionItems() {
			var items = [];
			modelnames.forEach(model => {
				let modelname = model.label.split(' ')[1];
				let complete = new vscode.CompletionItem(modelname);
				complete.commitCharacters = ['.'];
				complete.kind = vscode.CompletionItemKind.Field;
				complete.detail = `Press '.' to get ${modelname}`;
				complete.documentation = new vscode.MarkdownString(`**Mongo Snippets: Model Name Suggestion - \`${modelname}.\`**`);
				items.push(complete);
			});
			return items;
		}
	})

	// to complete after `modelnames.`
	const provider2 = vscode.languages.registerCompletionItemProvider({
			scheme: 'file',
			language: 'javascript'
		}, {
			provideCompletionItems(document, position) {
				var items = [];
				modelnames.forEach((model) => {
					let modelname = model.label.split(' ')[1];
					let linePrefix = document.lineAt(position).text.substr(0, position.character);
					if (!linePrefix.endsWith(`${modelname}.`)) {
						return undefined;
					}
					fieldnames.forEach((field) => {
						let complete = new vscode.CompletionItem(field, vscode.CompletionItemKind.Field);
						complete.documentation = new vscode.MarkdownString(`**Mongo Snippets: Field Name Suggestion - \`${field}\`**`);
						items.push(complete);
					})
				})
				return items;
			}
		},
		'.'
	)

	// to complete within {}
	const provider3 = vscode.languages.registerCompletionItemProvider({
			scheme: 'file',
			language: 'javascript'
		}, {
			provideCompletionItems(document, position) {

				// get field names

				let startPos = document.positionAt(0);

				let range = new vscode.Range(startPos, position);
				let preText = document.getText(range);
				let openbraces = preText.split('{').length - 1;
				let closedbraces = preText.split('}').length - 1;
				if (openbraces <= closedbraces) {
					return undefined
				}
				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (linePrefix.endsWith(`{`)) {
					return undefined
				}
				var items = [];
				fieldnames.forEach((field) => {
					let complete = new vscode.CompletionItem(field, vscode.CompletionItemKind.Field);
					complete.documentation = new vscode.MarkdownString(`**Mongo Snippets: Field Name Suggestion - \`${field}\`**`);
					items.push(complete);
				})
				return items;
			},
		},
		'{'
	);

	context.subscriptions.push(mongooseDocs);
	context.subscriptions.push(extensionDocs);
	context.subscriptions.push(setup);
	context.subscriptions.push(seeModels);
	context.subscriptions.push(viewCollections);
	context.subscriptions.push(provider1, provider2, provider3);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}