const fs = require('fs');
const path = require('path');

module.exports.readdirs = (FolderPath) => new Promise(function (resolve, reject) {
        fs.readdir(FolderPath, {
            withFileTypes: true,
            encoding: 'utf-8'
        }, (err, files) => {
            if(err) reject(err);
            resolve(files);
        });
    });


;