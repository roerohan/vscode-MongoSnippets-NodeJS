import vscode from 'vscode';
import path from 'path';

export default async function (
    modelNames: { label: string; detail: string }[],
    models: { [key: string]: { file: string } },
): Promise<void> {
    if (!modelNames || !modelNames.length) {
        vscode.window.showWarningMessage('Still looking for models... Try again!');
        return;
    }

    const val: {
        label: string;
        detail: string;
    } = await vscode.window.showQuickPick(modelNames, {
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
}
