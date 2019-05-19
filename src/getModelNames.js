var fs = require('fs');
var path = require('path');

function getFilesInModels(){
    if(!fs.existsSync(path.join('models')))
        return undefined;

    let files = fs.readdirSync(path.join('models'));
    return files;
}

function getModelsFromFiles(){
    var files = getFilesInModels();
    if(!files)
        return [];
    
    var modelnames = [];
    files.forEach((file) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) throw err;

            var re = /mongoose.model\s*\(\s*(["'`]).+(?:(?=(\\?))\2.)*?\1.*\)/gi;
            var firstmatches = data.match(re)

            var re2 = /(["'`])(?:(?=(\\?))\2.)*?\1/;

            firstmatches.forEach((firstmatch) => {

                let match = firstmatch.match(re2)[0];
                modelnames.push(match.substring(1, match.length-1));

            });
        });
    });
    return modelnames;
};


module.exports = {
    getModelsFromFiles
}