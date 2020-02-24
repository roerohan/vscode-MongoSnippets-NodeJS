const vscode = require('vscode');
const path = require('path');

const { makeFolders, makeFiles } = require('./appModel');
const precode = require('./precode.json');

function setup() {
    // @ts-ignore
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

module.exports = setup;