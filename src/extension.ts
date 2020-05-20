// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below


import * as vscode from 'vscode';
import path from 'path';

import snippets from './snippets/snippets.json';
import setupBoilerplate from './boilerplate/setup';
import viewCollectionJson from './connect/viewJson';
import getModelsFromFiles, { getFieldNames } from './suggestions/getModelNames';

let repeatTime = 0;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context: vscode.ExtensionContext): void {
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
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(extensionLink));
    });

    const setup = vscode.commands.registerCommand('extension.setup', () => {
        setupBoilerplate();
    });

    const viewCollections = vscode.commands.registerCommand('extension.viewCollections', async () => {
        viewCollectionJson();
    });

    let modelNames: { label: string; detail: string }[] = [];
    let models: { [key: string]: { file: string } } = {};
    let fieldnames: string[] = [];

    setInterval(async () => {
        try {
            models = await getModelsFromFiles();
            modelNames = [];

            if (!models) return;
            Object.keys(models).forEach((name) => {
                modelNames.push({
                    label: `$(star-delete) ${name}`,
                    detail: `$(file-code) Defined in ${models[name].file}, select to open.`,
                });
            });

            fieldnames = await getFieldNames(models);
        } catch (err) {
            console.error(err);
        }
    }, repeatTime);

    const seeModels = vscode.commands.registerCommand('extension.seeModels', async () => {
        if (!modelNames || !modelNames.length) {
            vscode.window.showWarningMessage('Still looking for models... Try again!');
            return;
        }

        const val: { label: string, detail: string } = await vscode.window.showQuickPick(modelNames, {
            placeHolder: 'Select a model to open it\'s source file...',
        });

        if (!val) return;

        const filePath = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, 'models', models[val.label.split(' ')[1]].file);

        const doc = await vscode.workspace.openTextDocument(filePath);
        const editor = await vscode.window.showTextDocument(doc);
        const match = RegExp(val.label.split(' ')[1]).exec(doc.getText());
        editor.selection = new vscode.Selection(
            doc.positionAt(match.index),
            doc.positionAt(match.index + match[0].length),
        );
        editor.revealRange(editor.selection, vscode.TextEditorRevealType.Default);
    });

    // to complete modelNames
    const provider1 = vscode.languages.registerCompletionItemProvider({
        scheme: 'file',
        language: 'javascript',
    }, {
        provideCompletionItems() {
            const items: any = [];
            modelNames.forEach((model: any) => {
                const modelname = model.label.split(' ')[1];
                const complete = new vscode.CompletionItem(modelname);
                complete.commitCharacters = ['.'];
                complete.kind = vscode.CompletionItemKind.Field;
                complete.detail = `Press '.' to get ${modelname}`;
                complete.documentation = new vscode.MarkdownString(`**Mongo Snippets: Model Name Suggestion - \`${modelname}.\`**`);
                items.push(complete);
            });
            return items;
        },
    });

    // to complete after `modelNames.`
    const provider2 = vscode.languages.registerCompletionItemProvider({
        scheme: 'file',
        language: 'javascript',
    }, {
        provideCompletionItems(document: any, position: any) {
            const items: any = [];
            modelNames.forEach((model: any): any => {
                const modelname = model.label.split(' ')[1];
                const linePrefix = document.lineAt(position).text.substr(0, position.character);
                if (!linePrefix.endsWith(`${modelname}.`)) {
                    return undefined;
                }
                fieldnames.forEach((field: any) => {
                    const complete = new vscode.CompletionItem(field, vscode.CompletionItemKind.Field);
                    complete.documentation = new vscode.MarkdownString(`**Mongo Snippets: Field Name Suggestion - \`${field}\`**`);
                    items.push(complete);
                });
            });
            return items;
        },
    },
        '.');

    // to complete within {}
    const provider3 = vscode.languages.registerCompletionItemProvider({
        scheme: 'file',
        language: 'javascript',
    }, {
        provideCompletionItems(document: any, position: any) {
            // get field names

            const startPos = document.positionAt(0);

            const range = new vscode.Range(startPos, position);
            const preText = document.getText(range);
            const openbraces = preText.split('{').length - 1;
            const closedbraces = preText.split('}').length - 1;
            if (openbraces <= closedbraces) {
                return undefined;
            }
            const linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (linePrefix.endsWith('{')) {
                return undefined;
            }
            const items: any = [];
            fieldnames.forEach((field: any) => {
                const complete = new vscode.CompletionItem(field, vscode.CompletionItemKind.Field);
                complete.documentation = new vscode.MarkdownString(`**Mongo Snippets: Field Name Suggestion - \`${field}\`**`);
                items.push(complete);
            });
            return items;
        },
    },
        '{');

    context.subscriptions.push(
        mongooseDocs,
        extensionDocs,
        setup,
        seeModels,
        viewCollections,
        provider1,
        provider2,
        provider3,
    );
}
exports.activate = activate;

// this method is called when your extension is deactivated
export function deactivate(): void {
    console.log('Deactivated');
}
