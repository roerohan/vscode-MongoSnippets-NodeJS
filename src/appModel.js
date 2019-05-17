import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class AppModel {

    makefiles(filepaths) {
        filepaths.forEach(filepath => this.makeFileSync(filepath));
    }

    makefolders(files) {
        files.forEach(file => this.makeDirSync(file));
    }

    makeDirSync(dir) {
        if (fs.existsSync(dir)) return;
        if (!fs.existsSync(path.dirname(dir))) {
            this.makeDirSync(path.dirname(dir));
        }
        fs.mkdirSync(dir);
    }

    makeFileSync(filename) {
        if (!fs.existsSync(filename)) {
            this.makeDirSync(path.dirname(filename));
            fs.createWriteStream(filename).close();
        }
    }
}