import vscode from 'vscode';

import setupBoilerplate from './boilerplate/setup';
import viewCollectionJson from './connect/viewJson';
import getModelsFromFiles from './modelUtils/getModelNames';
import seeModelsUtil from './modelUtils/seeModels';
import completionItemProviders from './modelUtils/completionItemProviders.js';

/**
 * @param {vscode.ExtensionContext} context
 */
export async function activate(context: vscode.ExtensionContext): Promise<void> {
    console.log('Mongo Snippets has been activated.');

    const mongooseLink = 'https://mongoosejs.com/docs/api.html#Model';
    const extensionLink = 'https://github.com/roerohan/vscode-MongoSnippets-NodeJS/blob/master/README.md';

    let models: { [key: string]: { file: string } } = await getModelsFromFiles();
    let providers: vscode.Disposable[] = await completionItemProviders(models);

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

    const seeModels = vscode.commands.registerCommand('extension.seeModels', async () => {
        await seeModelsUtil(models);
    });

    context.subscriptions.push(
        mongooseDocs,
        extensionDocs,
        setup,
        seeModels,
        viewCollections,
        ...providers,
    );

    setInterval(async () => {
        try {
            models = await getModelsFromFiles();
            providers.forEach((provider) => provider.dispose());
            providers = await completionItemProviders(models);
        } catch (err) {
            console.error(err);
        }
    }, 5000);
}
exports.activate = activate;

export function deactivate(): void {
    console.log('Deactivated Mongo Snippets.');
}
