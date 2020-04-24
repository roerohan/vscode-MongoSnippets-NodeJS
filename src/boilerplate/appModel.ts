'use strict';

import fs, { PathLike } from "fs";

function exists(path: PathLike) {
    fs.access(path, (err) => {
        if (err) {
            return false;
        }
        return true;
    });
}

function makeDir(path: PathLike) {
    // @ts-ignore
    if (!exists(path)) {
        fs.mkdir(path, { recursive: true }, (err) => {
            if (err) throw err;
        });
    }
}

function makeFile(path: PathLike, content: string) {
    // @ts-ignore
    if (!exists(path)) {
        fs.writeFile(path, content, (err) => {
            if (err) throw err;
        });
    }
}

export function makeFiles(files: string[], text: string[]) {
    files.forEach((file, index) => makeFile(file, text[index]));
}

export default function makeFolders(names: string[]) {
    names.forEach(name => makeDir(name));
}
