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
            var promises2 = [];
            files.forEach((file) => {
                promises.push(new Promise((resolve) => {
                    fs.readFile(path.join(rootPath, 'models', file), 'utf-8', (err, data) => {
                        if (err) {
                            console.log(err);
                            resolve('');
                        }
                        if (!data) {
                            console.log("No Data");
                            resolve('');
                        } else resolve({
                            "data": data,
                            "file": file
                        });
                    });
                }));
            });
            var re = /(?<=[Mm]ongoose.model\s*\(\s*(["'`])).+(?=(?:(?=(\\?))\2.)*?\1.*\))/gi;
            Promise.all(promises)
                .then((objects) => {
                    objects.forEach((object) => {
                        promises2.push(new Promise((resolve) => {
                            let first = object["data"].match(re);
                            if (first) {
                                resolve({
                                    "name": first.join(','),
                                    "file": object.file
                                });
                            } else resolve('');
                        }));
                    });
                    Promise.all(promises2).then((objects) => {
                        var modelobjects = objects.filter((el) => {
                            return el != null && el.name != null && el.file != null;
                        })
                        resolve(modelobjects);
                    }).catch((err) => {
                        console.log(err);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    });
}
module.exports = {
    getModelsFromFiles
}