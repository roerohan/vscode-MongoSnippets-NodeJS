import vscode from 'vscode';

import snippets from './snippets/snippets.json';
import setupBoilerplate from './boilerplate/setup';
import viewCollectionJson from './connect/viewJson';
import getModelsFromFiles, { getFieldNames } from './modelUtils/getModelNames';
import seeModelsUtil from './modelUtils/seeModels';
import completionItemProviders from './modelUtils/completionItemProviders.js';

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

    const providers = completionItemProviders(modelNames, fieldnames);

    context.subscriptions.push(
        mongooseDocs,
        extensionDocs,
        setup,
        seeModels,
        viewCollections,
        ...providers,
    );
}
exports.activate = activate;

// this method is called when your extension is deactivated
export function deactivate(): void {
    console.log('Deactivated');
}
