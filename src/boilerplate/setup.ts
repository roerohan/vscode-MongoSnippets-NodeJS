import * as vscode from 'vscode';
import path from 'path';

import makeFolders, { makeFiles } from './appModel';
import precode from './precode.json';

export default function setup() {
    const folderPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    makeFolders([
        path.join(folderPath, "models"),
        path.join(folderPath, "routes")
    ]);

    makeFiles(
        [
            path.join(folderPath, "routes/index.js"),
            path.join(folderPath, "models/db.js"),
            path.join(folderPath, "models/user.model.js"),
        ],
        [
            precode["index"].join("\n"),
            precode["connect"].join("\n"),
            precode["user model"].join("\n"),
        ]
    );
}
