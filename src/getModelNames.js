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
            var promises3 = [];
            files.forEach((file) => {
                promises.push(new Promise((resolve) => {
                    fs.readFile(path.join(rootPath, 'models', file), 'utf-8', (err, data) => {
                        if (err) console.log(err);
                        if (!data) console.log("No Data");
                        else resolve(data);
                    });
                }));
            });
            var re = /[Mm]ongoose.model\s*\(\s*(["'`]).+(?:(?=(\\?))\2.)*?\1.*\)/gi;
            var re2 = /(["'`])(?:(?=(\\?))\2.)*?\1/;
            Promise.all(promises)
                .then((data) => {
                    data.forEach((data) => {
                        promises2.push(new Promise((resolve)=>{
                            let first = data.match(re);
                            if (first) {
                                first.forEach((s) => {
                                    promises3.push(new Promise((resolve) => {
                                        let sec = s.match(re2)[0]
                                        let second = sec.substring(1, sec.length - 1);
                                        if (second) {
                                            resolve(second);
                                        }
                                        else resolve('');
                                    }));
                                });
                                Promise.all(promises3).then((names) => {
                                    resolve(names);
                                }).catch(err => {
                                    console.log(err);
                                });
                            }
                            else resolve('');
                        }));
                    });
                    Promise.all(promises3).then((names)=>{
                        var modelnames = names.filter((el)=>{
                            return el!=null && el!='';
                        })
                        resolve(modelnames);
                    }).catch((err)=>{
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