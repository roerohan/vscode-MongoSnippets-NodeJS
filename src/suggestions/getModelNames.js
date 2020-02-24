var fs = require('fs');
var path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// @ts-ignore
var rootPath = require('vscode').workspace.workspaceFolders[0].uri.fsPath;

function getFilesInModels() {
    if (!fs.existsSync(path.join(rootPath, 'models'))) {
        return undefined;
    } else {
        var files = fs.readdirSync(path.join(rootPath, 'models'));
        return files;
    }
}

async function getFile(file) {
    try {
        const data = await readFile(path.join(rootPath, 'models', file), 'utf-8')

        if (!data) {
            console.error(`No Data in file ${file}`);
            return {
                "name": '',
                "file": file
            }
        } else {
            var re = /(?<=[Mm]ongoose.model\s*\(\s*(["'`])).+(?=(?:(?=(\\?))\2.)*?\1.*\))/gi;
            let first = data.match(re);
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

async function getModelsFromFiles() {
    var files = getFilesInModels();
    if (!files) {
        return undefined;
    } else {
        try {
            var promises = [];
            files.forEach((file) => {
                promises.push(getFile(file));
            });
            const objects = await Promise.all(promises)
            var modelobjects = objects.filter((el) => {
                return el != null && el.name != null && el.name!='' && el.file != null;
            })
            return modelobjects;
        } catch (err) {
            console.error(err);
        }
    }
}

async function getExportFile (file) {
    try {
        const data = await readFile(path.join('models', file), 'utf-8')

        if (!data || !data.match('export')) return undefined;

        return file;
    } catch (err) {
        console.error(err);
        return undefined;
    }
}

async function getFieldNames(model) {
    var filename = [];
    for (var key in model) {
        if (!model.hasOwnProperty(key)) continue;
        let fname = [];
        fname.push(model[key]['file']);
        filename = fname.filter((el, index) => {
            return el!=null && fname.indexOf(el)===index;
        });
    }
    var promises = [];
    filename.forEach((file) => {
        promises.push(getExportFile(file));
    });
    var fields = [];

    const files = await Promise.all(promises);
    for (const file of files) {
        if(file){
            let temp = require(`${rootPath}/models/${file}`);
            if(temp.schema){
                for (key in temp.schema.obj)
                    fields.push(key);
            }
        } 
    }
    return fields;
}

module.exports = {
    getModelsFromFiles,
    getFieldNames,
}