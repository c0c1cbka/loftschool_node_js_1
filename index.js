const fs = require('fs');
const path = require('path');

const myFolderPath = './randomFolder';
const myNewFolderPath = './beatifulFolder'

function readFolder(folderPath) {
    fs.readdir(folderPath, {
            withFileTypes: true,
            encoding: 'utf-8'
        }, (err, files) => {
            if (err) {
                console.error(err);
                return 1;
            }
            files.forEach(el => {
                    if (el.isDirectory()) {
                        readFolder(path.join(folderPath, el.name));
                    } else {
                        if (el.isFile()) {
                            fs.access(myNewFolderPath, fs.constants.F_OK, (err) => {
                                    if (err) {
                                        fs.mkdirSync(myNewFolderPath);
                                    }
                                    fs.access(path.join(myNewFolderPath, el.name[0].toUpperCase()), fs.constants.F_OK, (err) => {
                                            if (err) {
                                                fs.mkdirSync(path.join(myNewFolderPath, el.name[0].toUpperCase()));
                                            }
                                            fs.copyFile(path.join(folderPath, el.name), path.join(path.join(myNewFolderPath, el.name[0].toUpperCase()),el.name), (err) => {
                                                if (err) {
                                                    console.error(err);
                                                    return 2;
                                                }
                                            });
                                        });
                                    });
                            }
                            else {
                                console.error(`${path.join(folderPath,el.name)} - не определенный тип`);
                                return 2;
                            }
                        }
                    });
            });
    }


    readFolder(myFolderPath);