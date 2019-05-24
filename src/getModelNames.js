var fs = require('fs');
var path = require('path');

var rootPath = require('vscode').workspace.rootPath;

function getFilesInModels() {
    if (!fs.existsSync(path.join(rootPath, 'models'))) {
        return undefined;
    } else {
        var files = fs.readdirSync(path.join(rootPath, 'models'));
        return files;
    }
}

function getModelsFromFiles() {
    return new Promise((resolve) => {
        var files = getFilesInModels();
        if (!files) {
            return undefined;
        } else {
            var promises = [];
            files.forEach((file) => {
                promises.push(new Promise((resolve) => {
                    fs.readFile(path.join(rootPath, 'models', file), 'utf-8', (err, data) => {
                        if (err) {
                            console.error(err);
                            resolve({
                                "name": '',
                                "file": file
                            });
                        }
                        if (!data) {
                            console.error(`No Data in file ${file}`);
                            resolve({
                                "name": '',
                                "file": file
                            });
                        } else {
                            var re = /(?<=[Mm]ongoose.model\s*\(\s*(["'`])).+(?=(?:(?=(\\?))\2.)*?\1.*\))/gi;
                            let first = data.match(re);
                            if (first) {
                                resolve({
                                    "name": first.join(','),
                                    "file": file
                                });
                            } else resolve({
                                "name": '',
                                "file": file
                            });
                        }
                    });
                }));
            });
            Promise.all(promises).then((objects) => {
                var modelobjects = objects.filter((el) => {
                    return el != null && el.name != null && el.name!='' && el.file != null;
                })
                resolve(modelobjects);
            }).catch((err) => {
                console.error(err);
            });
        }
    });
}

function getFieldNames(model) {
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
        promises.push(new Promise((resolve) =>{
            fs.readFile(path.join('models', file), 'utf-8', (err, data) => {
                if (err) {
                    console.error(err);
                    resolve(undefined);
                }
                if (!data) resolve(undefined);
                else {
                    if(data.match('export')){
                        resolve(file);
                    }
                    else resolve(undefined);
                }
            });
        }));
    });
    var fields = [];
    return new Promise(resolve => {
        Promise.all(promises)
            .then(files => {
                files.forEach(file=>{
                    if(file){
                        let temp = require(`${rootPath}/models/${file}`);
                        if(temp.schema){
                            for (key in temp.schema.obj)
                                fields.push(key);
                            resolve(fields);
                        }
                    }
                })
            });
    })
}

module.exports = {
    getModelsFromFiles,
    getFieldNames,
}