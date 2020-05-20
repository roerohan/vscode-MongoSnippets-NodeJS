import vscode from 'vscode';
import path from 'path';
import { listAllCollections, listDocs } from './showDB';

export default async function viewJson(): Promise<void> {
    const dbName = await vscode.window.showInputBox({
        placeHolder: 'Enter a connection string to the database.',
        value: 'mongodb://',
        ignoreFocusOut: true,
        prompt: "Valid connection strings usually begin with 'mongodb://'.",
    });

    if (!dbName) return;

    try {
        const items = await listAllCollections(dbName);
        const choice = await vscode.window.showQuickPick(items, {
            placeHolder: 'Choose a Collection:',
        });

        if (!choice) return;

        const docs = await listDocs(dbName, choice);

        const newFile = vscode.Uri.parse(`untitled:${path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, `${choice}.json`)}`);
        const document = await vscode.workspace.openTextDocument(newFile);

        const edit = new vscode.WorkspaceEdit();

        const display = JSON.stringify(docs, null, '\t');

        // const MarkdownString = new vscode.CodeLens()

        edit.insert(newFile, new vscode.Position(1, 0), display);

        const success = await vscode.workspace.applyEdit(edit);

        if (success) {
            vscode.window.showTextDocument(document);
        } else {
            vscode.window.showErrorMessage('Unexpected Failure! Could not write to file.');
        }
    } catch (err) {
        vscode.window.showErrorMessage(err);
    }
}
