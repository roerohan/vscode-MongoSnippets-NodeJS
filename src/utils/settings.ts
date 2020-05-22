import vscode from 'vscode';
import path from 'path';

const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;

export default async function sourceDir(): Promise<string> {
    try {
        const settings = await import(path.join(rootPath, '.vscode', 'settings.json'));

        if (!settings.mongosnippets || !settings.mongosnippets.sourceDir) {
            console.log('Using default settings.');
            return rootPath;
        }

        return path.join(rootPath, settings.mongosnippets.sourceDir);
    } catch (err) {
        console.log('Using default settings.');
        return rootPath;
    }
}
