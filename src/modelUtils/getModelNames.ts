import fs from 'fs';
import path from 'path';
import util from 'util';

const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);

async function getFilesInModels(sourceDir: string): Promise<string[]> {
    try {
        const files = await readdir(path.join(sourceDir, 'models'));
        return files;
    } catch (err) {
        if (err.code !== 'ENOENT') console.error(err);
        return [];
    }
}

async function getModelsInFile(
    file: string,
    sourceDir: string,
): Promise<{ [key: string]: { file: string } }> {
    const re = /(?<=[Mm]ongoose.model\s*\(\s*(["'`])).+(?=(?:(?=(\\?))\2.)*?\1.*\))/gi;

    const models: { [key: string]: { file: string } } = {};
    try {
        const data = await readFile(path.join(sourceDir, 'models', file), 'utf-8');

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

export default async function getModelsFromFiles(
    sourceDir: string,
): Promise<{ [key: string]: { file: string } }> {
    const files = await getFilesInModels(sourceDir);
    if (!files || !files.length) {
        return undefined;
    }
    let models: { [key: string]: { file: string } } = {};
    try {
        const promises: Array<Promise<{ [key: string]: { file: string } }>> = [];
        files.forEach((file) => {
            promises.push(getModelsInFile(file, sourceDir));
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

async function getExportFile(file: string, sourceDir: string): Promise<string> {
    try {
        const data = await readFile(
            path.join(
                sourceDir,
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
    sourceDir: string,
): Promise<string[]> {
    if (!models) return [];

    const promises: Array<Promise<string>> = [];
    const filenames: string[] = [];
    const fieldsMap: { [key: string]: Promise<{ schema: { obj: object } }> } = {};

    Object.keys(models).forEach((model) => {
        const { file } = models[model];
        if (!file || filenames.indexOf(file) !== -1) {
            return;
        }
        filenames.push(file);
        promises.push(getExportFile(file, sourceDir));
    });

    const files = (await Promise.all(promises)).filter((file) => !!file);

    async function getFields(): Promise<string[]> {
        files.forEach((file) => {
            const target = import(`${sourceDir}/models/${file}`);
            fieldsMap[file] = target;
        });

        const schemaObjs = await Promise.all(Object.values(fieldsMap));
        let fields: string[] = [];

        schemaObjs.forEach((schemaObj) => {
            if (!schemaObj.schema) return;
            fields = fields.concat(Object.keys(schemaObj.schema.obj));
        });
        return fields;
    }

    return getFields();
}
