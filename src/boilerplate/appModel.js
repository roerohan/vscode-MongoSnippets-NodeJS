const fs = require('fs');
const path = require('path');

class AppModel {

    makefiles(filepaths, text) {
        filepaths.forEach((filepath) => this.makeFileSync(filepath, text[filepaths.indexOf(filepath)]));
    }

    makefolders(files) {
        files.forEach(file => this.makeDirSync(file));
    }

    makeDirSync(dir) {
        if (fs.existsSync(dir)) return;
        if (!fs.existsSync(path.dirname(dir))) {
            this.makeDirSync(path.dirname(dir));
        }
        fs.mkdirSync(dir);
    }

    makeFileSync(filename, text) {
        if(!text) text="";
        if (!fs.existsSync(filename)) {
            this.makeDirSync(path.dirname(filename));
            fs.createWriteStream(filename).close();
            fs.writeFile(filename, text, err => {
                if (err) throw err;
            });
        }
    }

}

module.exports = {
    AppModel
}