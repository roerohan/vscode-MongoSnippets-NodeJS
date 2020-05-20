import vscode from 'vscode';

import snippets from './snippets/snippets.json';
import setupBoilerplate from './boilerplate/setup';
import viewCollectionJson from './connect/viewJson';
import getModelsFromFiles, { getFieldNames } from './modelUtils/getModelNames';
import seeModelsUtil from './modelUtils/seeModels';

/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context: vscode.ExtensionContext): void {
    console.log('Mongo Snippets has been activated.');
    const mongooseLink = 'https://mongoosejs.com/docs/api.html#Model';
    const extensionLink = 'https://github.com/roerohan/vscode-MongoSnippets-NodeJS/blob/master/README.md';

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
    }, 2000);

    const seeModels = vscode.commands.registerCommand('extension.seeModels', async () => {
        await seeModelsUtil(modelNames, models);
    });

    // to complete modelNames
    const provider1 = vscode.languages.registerCompletionItemProvider({
        scheme: 'file',
        language: 'javascript',
    }, {
        provideCompletionItems() {
            const items: vscode.CompletionItem[] = [];
            modelNames.forEach((model) => {
                const modelname = model.label.split(' ')[1];
                const complete = new vscode.CompletionItem(modelname);
                complete.commitCharacters = ['.'];
                complete.kind = vscode.CompletionItemKind.Field;
                complete.detail = `Press '.' to get ${modelname}`;
                complete.documentation = new vscode.MarkdownString(
                    `**Mongo Snippets: Model Name Suggestion - \`${modelname}.\`**`,
                );
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
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
            const items: vscode.CompletionItem[] = [];
            modelNames.forEach((model) => {
                const modelname = model.label.split(' ')[1];
                const linePrefix = document.lineAt(position).text.substr(0, position.character);
                if (!linePrefix.endsWith(`${modelname}.`)) {
                    return;
                }
                fieldnames.forEach((field) => {
                    const complete = new vscode.CompletionItem(
                        field,
                        vscode.CompletionItemKind.Field,
                    );

                    complete.documentation = new vscode.MarkdownString(
                        `**Mongo Snippets: Field Name Suggestion - \`${field}\`**`,
                    );
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
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
            // get field names
            const items: vscode.CompletionItem[] = [];
            const startPos = document.positionAt(0);

            const preText = document.getText(new vscode.Range(startPos, position));
            const openbraces = preText.split('{').length - 1;
            const closedbraces = preText.split('}').length - 1;

            if (openbraces <= closedbraces) {
                return items;
            }

            const linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (linePrefix.endsWith('{')) {
                return items;
            }

            fieldnames.forEach((field) => {
                const complete = new vscode.CompletionItem(
                    field,
                    vscode.CompletionItemKind.Field,
                );

                complete.documentation = new vscode.MarkdownString(
                    `**Mongo Snippets: Field Name Suggestion - \`${field}\`**`,
                );
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
