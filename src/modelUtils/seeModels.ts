import vscode from 'vscode';
import path from 'path';

export default async function (
    models: { [key: string]: { file: string } },
    sourceDir: string,
): Promise<void> {
    if (!models) {
        vscode.window.showWarningMessage(`Searching for models in ${sourceDir}/models...`);
        return;
    }

    const modelNames: { label: string; detail: string }[] = [];

    Object.keys(models).forEach((name) => {
        modelNames.push({
            label: `$(star-delete) ${name}`,
            detail: `$(file-code) Defined in ${models[name].file}, select to open.`,
        });
    });

    const val: {
        label: string;
        detail: string;
    } = await vscode.window.showQuickPick(modelNames, {
        placeHolder: 'Select a model to open it\'s source file...',
    });

    if (!val) return;

    const filePath = path.join(
        sourceDir,
        'models',
        models[val.label.split(' ')[1]].file,
    );

    const doc = await vscode.workspace.openTextDocument(filePath);
    const editor = await vscode.window.showTextDocument(doc);
    const match = RegExp(val.label.split(' ')[1]).exec(doc.getText());

    editor.selection = new vscode.Selection(
        doc.positionAt(match.index),
        doc.positionAt(match.index + match[0].length),
    );
    editor.revealRange(editor.selection, vscode.TextEditorRevealType.Default);
}
