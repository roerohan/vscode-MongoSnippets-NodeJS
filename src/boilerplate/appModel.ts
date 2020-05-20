import fs, { PathLike } from 'fs';

function makeDir(path: PathLike): void {
    if (!fs.existsSync(path)) {
        fs.mkdir(path, { recursive: true }, (err) => {
            if (err) throw err;
        });
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

export default function makeFolders(names: string[]): void {
    names.forEach((name) => makeDir(name));
}
