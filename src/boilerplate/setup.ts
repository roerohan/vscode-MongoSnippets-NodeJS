import path from 'path';

import makeFolders, { makeFiles } from './appModel';
import precode from './precode.json';

export default async function setup(sourceDir: string): Promise<void> {
    await makeFolders([
        path.join(sourceDir, 'models'),
        path.join(sourceDir, 'routes'),
    ]);

    makeFiles(
        [
            path.join(sourceDir, 'routes/index.js'),
            path.join(sourceDir, 'models/db.js'),
            path.join(sourceDir, 'models/user.model.js'),
        ],
        [
            precode.index.join('\n'),
            precode.connect.join('\n'),
            precode['user model'].join('\n'),
        ],
    );
}
