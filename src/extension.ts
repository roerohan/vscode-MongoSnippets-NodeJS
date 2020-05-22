import vscode from 'vscode';

import setupBoilerplate from './boilerplate/setup';
import viewCollectionJson from './connect/viewJson';
import getModelsFromFiles from './modelUtils/getModelNames';
import seeModelsUtil from './modelUtils/seeModels';
import completionItemProviders from './modelUtils/completionItemProviders.js';
import settings from './utils/settings';

/**
 * @param {vscode.ExtensionContext} context
 */
export async function activate(context: vscode.ExtensionContext): Promise<void> {
    console.log('Mongo Snippets has been activated.');

    const sourceDir = await settings();
    const mongooseLink = 'https://mongoosejs.com/docs/api.html#Model';
    const extensionLink = 'https://github.com/roerohan/vscode-MongoSnippets-NodeJS/blob/master/README.md';

    let models: { [key: string]: { file: string } } = await getModelsFromFiles(sourceDir);
    let providers: vscode.Disposable[] = await completionItemProviders(models, sourceDir);

    const mongooseDocs = vscode.commands.registerCommand('extension.mongoosejsDocs', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(mongooseLink));
    });

    const extensionDocs = vscode.commands.registerCommand('extension.extensionDocs', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(extensionLink));
    });

    const setup = vscode.commands.registerCommand('extension.setup', async () => {
        await setupBoilerplate(sourceDir);
    });

    const viewCollections = vscode.commands.registerCommand('extension.viewCollections', async () => {
        viewCollectionJson(sourceDir);
    });

    const seeModels = vscode.commands.registerCommand('extension.seeModels', async () => {
        await seeModelsUtil(models, sourceDir);
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
            models = await getModelsFromFiles(sourceDir);
            providers.forEach((provider) => provider.dispose());
            providers = await completionItemProviders(models, sourceDir);
        } catch (err) {
            console.error(err);
        }
    }, 5000);
}
exports.activate = activate;

export function deactivate(): void {
    console.log('Deactivated Mongo Snippets.');
}
