import fs from 'fs';
import path from 'path';
import util from 'util';
import * as vscode from 'vscode';

const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
const readFile = util.promisify(fs.readFile);

function getFilesInModels() {
    if (!fs.existsSync(path.join(rootPath, 'models'))) {
        return undefined;
    } else {
        const files = fs.readdirSync(path.join(rootPath, 'models'));
        return files;
    }
}

async function getFile(file: string) {
    try {
        const data = await readFile(path.join(rootPath, 'models', file), 'utf-8')

        if (!data) {
            console.error(`No Data in file ${file}`);
            return {
                "name": '',
                "file": file
            }
        } else {
            const re = /(?<=[Mm]ongoose.model\s*\(\s*(["'`])).+(?=(?:(?=(\\?))\2.)*?\1.*\))/gi;
            const first = data.match(re);
            if (first) {
                return {
                    "name": first.join(','),
                    "file": file
                };
            } else {
                return {
                    "name": '',
                    "file": file
                }
            }
        }
    } catch (err) {
        console.error(err);
        return {
            "name": '',
            "file": file
        }
    }
}

export default async function getModelsFromFiles() {
    const files = getFilesInModels();
    if (!files) {
        return undefined;
    } else {
        try {
            const promises: Array<Promise<{
                "name": string;
                "file": string;
            }>> = [];
            files.forEach((file) => {
                promises.push(getFile(file));
            });
            const objects = await Promise.all(promises)
            const modelobjects = objects.filter((el) => {
                return el != null && el.name != null && el.name != '' && el.file != null;
            })
            return modelobjects;
        } catch (err) {
            console.error(err);
        }
    }
}

async function getExportFile(file: string) {
    try {
        const data = await readFile(path.join('models', file), 'utf-8')

        if (!data || !data.match('export')) return undefined;

        return file;
    } catch (err) {
        if (err.code !== 'ENOENT') console.error(err);
        return undefined;
    }
}

export async function getFieldNames(model: any) {
    if (!model) return;
    let filename: string[] = [];
    for (var key in model) {
        if (!model.hasOwnProperty(key)) continue;
        const fname: string[] = [];
        fname.push(model[key]['file']);
        filename = fname.filter((el: string, index: number) => {
            return el != null && fname.indexOf(el) === index;
        });
    }
    const promises: Array<Promise<string>> = [];
    filename.forEach((file: string) => {
        promises.push(getExportFile(file));
    });
    const fields = [];

    const files = await Promise.all(promises);
    for (const file of files) {
        if (file) {
            const temp = require(`${rootPath}/models/${file}`);
            if (temp.schema) {
                for (key in temp.schema.obj)
                    fields.push(key);
            }
        }
    }
    return fields;
}
