'use strict';
const fs = require('fs');

function exists(path) {
    fs.access(path, (err) => {
        if (err) {
            return false;
        }
        return true;
    });
}

function makeDir(path) {
    // @ts-ignore
    if (!exists(path)) {
        fs.mkdir(path, { recursive: true }, (err) => {
            if (err) throw err;
        });
    }
}

function makeFile(path, content) {
    // @ts-ignore
    if (!exists(path)) {
        fs.writeFile(path, content, (err) => {
            if (err) throw err;
        });
    }
}

function makeFiles(files, text) {
    files.forEach((file, index) => makeFile(file, text[index]));
}

function makeFolders(names) {
    names.forEach(name => makeDir(name));
}

module.exports = {
    makeFiles,
    makeFolders,
}