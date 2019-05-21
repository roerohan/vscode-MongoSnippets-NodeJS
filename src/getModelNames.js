var fs = require('fs');
var path = require('path');
var vscode = require('vscode');

const rootPath = vscode.workspace.rootPath;

function getFilesInModels() {
    if (!fs.existsSync(path.join(rootPath, 'models'))) {
        return undefined;
    } else {
        var files = fs.readdirSync(path.join(rootPath,'models'));
        return files;
    }
}


function getModelsFromFiles() {
    return new Promise((resolve, reject) => {
        var files = getFilesInModels();
        if (!files) {
            return undefined;
        } else {
            var promises = [];
            var promises2 = [];
            var promises3 = [];
            files.forEach((file) => {
                promises.push(new Promise((resolve, reject) => {
                    fs.readFile(path.join(rootPath, 'models', file), 'utf-8', (err, data) => {
                        if (err) reject(err);
                        if (!data) reject('No Data');
                        else resolve(data);
                    });
                }));
            });
            var re = /mongoose.model\s*\(\s*(["'`]).+(?:(?=(\\?))\2.)*?\1.*\)/gi;
            var re2 = /(["'`])(?:(?=(\\?))\2.)*?\1/;
            Promise.all(promises)
                .then((data) => {
                    data.forEach((data) => {
                        promises2.push(new Promise((resolve, reject)=>{
                            let first = data.match(re);
                            if (first) {
                                first.forEach((s) => {
                                    promises3.push(new Promise((resolve, reject) => {
                                        let second = s.match(re2)[0].split('\'')[1];
                                        if (second) {
                                            resolve(second);
                                        } else
                                            reject(second);
                                    }));
                                });
                                Promise.all(promises3).then((names) => {
                                    resolve(names);
                                }).catch(err => {
                                    reject(err);
                                });
                            }
                        }));
                    });
                    Promise.all(promises3).then((names)=>{
                        resolve(names);
                    }).catch((err)=>{
                        reject(err);
                    });
                })
                .catch(err => {
                    reject(err);
                });
        }
    });
}

module.exports = {
    getModelsFromFiles
}