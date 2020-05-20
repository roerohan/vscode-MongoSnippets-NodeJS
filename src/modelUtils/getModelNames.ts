import vscode from 'vscode';
import fs from 'fs';
import path from 'path';
import util from 'util';

const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
const readFile = util.promisify(fs.readFile);

function getFilesInModels(): string[] {
    if (!fs.existsSync(path.join(rootPath, 'models'))) {
        return undefined;
    }
    const files = fs.readdirSync(path.join(rootPath, 'models'));
    return files;
}

async function getModelsInFile(file: string): Promise<{ [key: string]: { file: string } }> {
    const re = /(?<=[Mm]ongoose.model\s*\(\s*(["'`])).+(?=(?:(?=(\\?))\2.)*?\1.*\))/gi;

    const models: { [key: string]: { file: string } } = {};
    try {
        const data = await readFile(path.join(rootPath, 'models', file), 'utf-8');

        const matches = data.match(re);
        if (!!data && !!matches) {
            matches.forEach((match) => {
                if (!file) return;
                models[match] = { file };
            });
        }
        return models;
    } catch (err) {
        console.error(err);
        return models;
    }
}

export default async function getModelsFromFiles(): Promise<{ [key: string]: { file: string } }> {
    const files = getFilesInModels();
    if (!files) {
        return undefined;
    }
    let models: { [key: string]: { file: string } } = {};
    try {
        const promises: Array<Promise<{ [key: string]: { file: string } }>> = [];
        files.forEach((file) => {
            promises.push(getModelsInFile(file));
        });

        (await Promise.all(promises)).forEach((newModels) => {
            models = { ...models, ...newModels };
        });
        return models;
    } catch (err) {
        console.error(err);
        return models;
    }
}

async function getExportFile(file: string): Promise<string> {
    try {
        const data = await readFile(
            path.join(
                rootPath,
                'models',
                file,
            ),
            'utf-8',
        );

        if (!data || !data.includes('export')) return undefined;
        return file;
    } catch (err) {
        console.error(err);
        if (err.code !== 'ENOENT') console.error(err);
        return undefined;
    }
}

export async function getFieldNames(
    models: { [key: string]: { file: string } },
): Promise<string[]> {
    if (!models) return [];

    const promises: Array<Promise<string>> = [];
    const filenames: string[] = [];
    const fields: string[] = [];

    Object.keys(models).forEach((model) => {
        const { file } = models[model];
        if (!file || filenames.indexOf(file) !== -1) {
            return;
        }
        filenames.push(file);
        promises.push(getExportFile(file));
    });

    const files = (await Promise.all(promises)).filter((file) => !!file);
    files.forEach(async (file) => {
        try {
            const temp = await import(`${rootPath}/models/${file}`);
            if (temp.schema) {
                Object.keys(temp.schema.obj).forEach((key: string) => {
                    fields.push(key);
                });
            }
        } catch {
            return '';
        }
        return '';
    });
    return fields;
}
