import fs, { PathLike } from 'fs';
import util from 'util';

const mkdir = util.promisify(fs.mkdir);

async function makeDir(path: PathLike): Promise<void> {
    if (!fs.existsSync(path)) {
        await mkdir(path, { recursive: true });
    }
}

function makeFile(path: PathLike, content: string): void {
    if (!fs.existsSync(path)) {
        fs.writeFile(path, content, (err) => {
            if (err) throw err;
        });
    }
}

export function makeFiles(files: string[], text: string[]): void {
    files.forEach((file, index) => makeFile(file, text[index]));
}

export default async function makeFolders(names: string[]): Promise<void> {
    const promises: Promise<void>[] = [];
    names.forEach((name) => promises.push(makeDir(name)));
    await Promise.all(promises);
}
