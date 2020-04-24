// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
'use strict';

import * as vscode from 'vscode';
import path from 'path';

import setupBoilerplate from './boilerplate/setup';
import viewCollectionJson from './connect/viewJson';
import getModelsFromFiles, { getFieldNames } from './suggestions/getModelNames';

let repeatTime = 0;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated

    console.log('Mongo Snippets has been activated.');
    const mongooseLink = 'https://mongoosejs.com/docs/api.html#Model';
    const extensionLink = 'https://github.com/roerohan/vscode-MongoSnippets-NodeJS/blob/master/README.md';

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json

    const mongooseDocs = vscode.commands.registerCommand('extension.mongoosejsDocs', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(mongooseLink));
    });

    const extensionDocs = vscode.commands.registerCommand('extension.extensionDocs', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(extensionLink))
    });

    const setup = vscode.commands.registerCommand('extension.setup', () => {
        setupBoilerplate();
    });

    const viewCollections = vscode.commands.registerCommand('extension.viewCollections', async () => {
        viewCollectionJson();
    });

    let modelnames: any = [];
    let models = {};
    let fieldnames: any = [];
    setInterval(() => {
        getModelsFromFiles().then(async (names: any) => {
            let n: any = [];
            const m: any = {};
            if (!names || !names.length) return;
            names.forEach((name: any) => {
                const temp = name["name"].split(',');
                temp.forEach((t: any, i: any) => {
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
        }).catch((err: Error) => {
            console.error(err + "\nError");
        });
    }, repeatTime); // Executes without waiting for the first time

    repeatTime = 5000; // Set interval to 5 seconds


    const seeModels = vscode.commands.registerCommand('extension.seeModels', async () => {
        if (modelnames != null && modelnames.length > 0) {
            const val = await vscode.window.showQuickPick(modelnames, {
                placeHolder: 'Select a model to open it\'s source file...'
            });
            if (!val)
                return;
            // @ts-ignore
            const filePath = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, 'models', models[val['label'].split(' ')[1]]['file']);
            vscode.workspace.openTextDocument(filePath).then(async (doc: any) => {
                vscode.window.showTextDocument(doc).then((editor: any) => {
                    const text = doc.getText();
                    const match = RegExp(val.split(' ')[1]).exec(text);
                    const startPos = doc.positionAt(match.index);
                    const endPos = doc.positionAt(match.index + match[0].length);
                    editor.selection = new vscode.Selection(startPos, endPos);
                    editor.revealRange(editor.selection, vscode.TextEditorRevealType.Default);
                });
            });
        } else {
            vscode.window.showWarningMessage("Looking for models...");
        }
    });

    // to complete modelnames
    const provider1 = vscode.languages.registerCompletionItemProvider({
        scheme: 'file',
        language: 'javascript'
    }, {
        provideCompletionItems() {
            const items: any = [];
            modelnames.forEach((model: any) => {
                const modelname = model.label.split(' ')[1];
                const complete = new vscode.CompletionItem(modelname);
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
        provideCompletionItems(document: any, position: any) {
            const items: any = [];
            modelnames.forEach((model: any): any => {
                const modelname = model.label.split(' ')[1];
                const linePrefix = document.lineAt(position).text.substr(0, position.character);
                if (!linePrefix.endsWith(`${modelname}.`)) {
                    return undefined;
                }
                fieldnames.forEach((field: any) => {
                    const complete = new vscode.CompletionItem(field, vscode.CompletionItemKind.Field);
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
        provideCompletionItems(document: any, position: any) {

            // get field names

            const startPos = document.positionAt(0);

            const range = new vscode.Range(startPos, position);
            const preText = document.getText(range);
            const openbraces = preText.split('{').length - 1;
            const closedbraces = preText.split('}').length - 1;
            if (openbraces <= closedbraces) {
                return undefined
            }
            const linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (linePrefix.endsWith(`{`)) {
                return undefined
            }
            const items: any = [];
            fieldnames.forEach((field: any) => {
                const complete = new vscode.CompletionItem(field, vscode.CompletionItemKind.Field);
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
export function deactivate() { }
