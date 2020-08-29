const fs = require('fs');
const path = require('path');

let readdir = (FolderPath) => new Promise(function (resolve, reject) {
        fs.readdir(FolderPath, {
            withFileTypes: true,
            encoding: 'utf-8'
        }, (err, files) => {
            if(err) reject(err);
            resolve(files);
        });
    });


module.exports = readdir;