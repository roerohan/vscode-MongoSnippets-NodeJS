import fs from 'fs';
import path from 'path';
import util from 'util';
import * as vscode from 'vscode';

const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
const readFile = util.promisify(fs.readFile);

function getFilesInModels(): string[] {
    if (!fs.existsSync(path.join(rootPath, 'models'))) {
        return undefined;
    }
    const files = fs.readdirSync(path.join(rootPath, 'models'));
    return files;
}

async function getModelsInFile(file: string): Promise<{ name: string; file: string }[]> {
    const re = /(?<=[Mm]ongoose.model\s*\(\s*(["'`])).+(?=(?:(?=(\\?))\2.)*?\1.*\))/gi;
    const models: { name: string, file: string }[] = [{
        name: '',
        file,
    }];

    try {
        const data = await readFile(path.join(rootPath, 'models', file), 'utf-8');

        const matches = data.match(re);
        if (!!data && !!matches) {
            matches.forEach((match) => {
                models.push({
                    name: match,
                    file,
                });
            })
        }
        return models;
    } catch (err) {
        console.error(err);
        return models;
    }
}

export default async function getModelsFromFiles(): Promise<{ name: string; file: string }[]> {
    const files = getFilesInModels();
    if (!files) {
        return undefined;
    }
    try {
        const promises: Array<Promise<{ name: string, file: string }[]>> = [];
        files.forEach((file) => {
            promises.push(getModelsInFile(file));
        });

        let temp: { name: string, file: string }[] = [];
        (await Promise.all(promises)).forEach((models) => {
            temp = temp.concat(models);
        });
        
        const objects = temp.filter((t) => !!t.name);
        const modelobjects = objects.filter((el) => !!el && !!el.name && !!el.file);
        return modelobjects;
    } catch (err) {
        console.error(err);
        return [{ name: '', file: '' }];
    }
}

async function getExportFile(file: string): Promise<string> {
    try {
        const data = await readFile(path.join('models', file), 'utf-8');

        if (!data || !data.includes('export')) return undefined;

        return file;
    } catch (err) {
        if (err.code !== 'ENOENT') console.error(err);
        return undefined;
    }
}

export async function getFieldNames(
    model: { [key: string]: { file: string } },
): Promise<string[]> {
    if (!model) return [];

    const promises: Array<Promise<string>> = [];
    const filenames: string[] = [];
    const fields: string[] = [];

    Object.keys(model).forEach((key) => {
        const { file } = model[key];
        if (!file || filenames.indexOf(file) !== -1) {
            return;
        }
        filenames.push(file);
        promises.push(getExportFile(file));
    });

    const files = (await Promise.all(promises)).filter((file) => !!file);

    files.forEach(async (file) => {
        const temp = await import(`${rootPath}/models/${file}`);
        if (temp.schema) {
            temp.schema.obj.forEach((key: string) => {
                fields.push(key);
            });
        }
    });

    return fields;
}
