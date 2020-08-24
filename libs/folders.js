const fs = require('fs');
const path = require('path');
const Observer = require('./observer');

module.exports = class {
    constructor() {
        this.arrayFilePath = [];
        this.ObserverFilesInFolder;
        this.ObserverCopy;
        this.ObserverDel;
    }

    readFolder(folderPath) {
        this.ObserverFilesInFolder.addObserver(folderPath);
        fs.readdir(folderPath, {
            withFileTypes: true,
            encoding: 'utf-8'
        }, (err, files) => {
            if (err) {
                throw err;
            }
            files.forEach(el => {
                let curentPath = path.join(folderPath, el.name);
                this.ObserverFilesInFolder.addObserver(curentPath);

                if (el.isDirectory()) {
                    this.ObserverFilesInFolder.removeObserver(curentPath);
                    let obj_file = {
                        "file_name": el.name, //имя файлф
                        "file_path": curentPath, //путь до файла
                    }
                    this.arrayFilePath.push(obj_file);
                    this.readFolder(curentPath);
                } else
                if (el.isFile()) {
                    let obj_file = {
                        "file_name": el.name, //имя файлф
                        "file_path": curentPath, //путь до файла
                    }
                    this.arrayFilePath.push(obj_file);
                    this.ObserverFilesInFolder.removeObserver(curentPath);
                } else {
                    throw `${curentPath} - не определенный тип`;
                }
            });

            this.ObserverFilesInFolder.removeObserver(folderPath);
        });
    }


    getFilesInFolder(folderPath, callback) {
        this.ObserverFilesInFolder = new Observer(() => {
            callback(this.arrayFilePath);
        });
        this.ObserverFilesInFolder.start();
        this.readFolder(folderPath);
    }

    systemCopy(folderPath, arrayFilePath) {
        this.ObserverCopy.addObserver(folderPath);
        fs.mkdir(folderPath, () => {
            arrayFilePath.forEach(el => {
                let newPath = path.join(folderPath, el.file_name[0].toUpperCase());
                this.ObserverCopy.addObserver(newPath);

                fs.mkdir(newPath, () => {
                    this.ObserverCopy.addObserver(path.join(newPath, el.file_name));
                    fs.copyFile(el.file_path, path.join(newPath, el.file_name), () => {
                        this.ObserverCopy.removeObserver(path.join(newPath, el.file_name));
                    });

                    this.ObserverCopy.removeObserver(newPath);
                });
            });
            this.ObserverCopy.removeObserver(folderPath);
        });
    }

    systematizationCopyFiles(folderPath, arrayFilePath, callback) {
        this.ObserverCopy = new Observer(() => {
            callback();
        });
        this.ObserverCopy.start();
        this.systemCopy(folderPath, arrayFilePath);
    }

    systemDel(folderPath) {
        this.ObserverDel.addObserver(folderPath);
        fs.readdir(folderPath, {
            withFileTypes: true,
            encoding: 'utf-8'
        }, (err, files) => {
            if (err) {
                throw err;
            }
            files.forEach(el => {
                let curentPath = path.join(folderPath, el.name);
                this.ObserverDel.addObserver(curentPath);

                if (el.isDirectory()) {
                    this.systemDel(curentPath);
                    this.ObserverDel.removeObserver(curentPath);
                } else
                if (el.isFile()) {
                    fs.unlink(curentPath, (err) => {
                        if (err) throw err;

                        //this.ObserverDel.addObserver(path.join(curentPath, '../')+'unlink');
                        //Рекурсивное удаление https://youtu.be/m-hMYMqnDvo?t=5131

                        this.ObserverDel.removeObserver(curentPath);
                    });
                } else {
                    throw `${curentPath} - не определенный тип`;
                }
            });

            this.ObserverDel.removeObserver(folderPath);
        });
    }

    deleteFolderAndFiles(folderPath, callback) {
        this.ObserverDel = new Observer(() => {
            callback();
        });
        this.ObserverDel.start();
        this.systemDel(folderPath);
    }
}