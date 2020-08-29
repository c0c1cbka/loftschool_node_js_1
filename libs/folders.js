const fs = require('fs');
const path = require('path');
//const Observer = require('./observer');
const fsPromise = ('./fs_promise.js');

module.exports = class {
    constructor() {
        this.arrayFilePath = [];
        // this.ObserverFilesInFolder;
        // this.ObserverCopy;
        // this.ObserverDel;
    }

    async readFolder(folderPath) {
        fsPromise.readdir;
        // let files = await fs.readdir(folderPath, {
        //     withFileTypes: true,
        //     encoding: 'utf-8'
        // }); (err, files) => {
        //     console.log(files);
            // if (err) {
            //     throw err;
            // }
            // files.forEach(el => {
            //     let curentPath = path.join(folderPath, el.name);

            //     if (el.isDirectory()) {
            //         let obj_file = {
            //             "file_name": el.name, //имя файлф
            //             "file_path": curentPath, //путь до файла
            //         }
            //         this.arrayFilePath.push(obj_file);
            //         this.readFolder(curentPath);
            //     } else
            //     if (el.isFile()) {
            //         let obj_file = {
            //             "file_name": el.name, //имя файлф
            //             "file_path": curentPath, //путь до файла
            //         }
            //         this.arrayFilePath.push(obj_file);
            //     } else {
            //         throw `${curentPath} - не определенный тип`;
            //     }
            // });

            
        //});
    }


    getFilesInFolder(folderPath, callback) {
        // this.ObserverFilesInFolder = new Observer(() => {
        //     callback(this.arrayFilePath);
        // });
        // this.ObserverFilesInFolder.start();
        this.readFolder(folderPath);


    }

    // systemCopy(folderPath, arrayFilePath) {
    //     this.ObserverCopy.addObserver(folderPath);
    //     fs.mkdir(folderPath, () => {
    //         arrayFilePath.forEach(el => {
    //             let newPath = path.join(folderPath, el.file_name[0].toUpperCase());
    //             this.ObserverCopy.addObserver(newPath);

    //             fs.mkdir(newPath, () => {
    //                 this.ObserverCopy.addObserver(path.join(newPath, el.file_name));
    //                 fs.copyFile(el.file_path, path.join(newPath, el.file_name), () => {
    //                     this.ObserverCopy.removeObserver(path.join(newPath, el.file_name));
    //                 });

    //                 this.ObserverCopy.removeObserver(newPath);
    //             });
    //         });
    //         this.ObserverCopy.removeObserver(folderPath);
    //     });
    // }

    // systematizationCopyFiles(folderPath, arrayFilePath, callback) {
    //     this.ObserverCopy = new Observer(() => {
    //         callback();
    //     });
    //     this.ObserverCopy.start();
    //     this.systemCopy(folderPath, arrayFilePath);
    // }

    // systemDel(folderPath) {
    //     this.ObserverDel.addObserver(folderPath);
    //     fs.readdir(folderPath, {
    //         withFileTypes: true,
    //         encoding: 'utf-8'
    //     }, (err, files) => {
    //         if (err) {
    //             throw err;
    //         }
    //         files.forEach(el => {
    //             let curentPath = path.join(folderPath, el.name);
    //             this.ObserverDel.addObserver(curentPath);

    //             if (el.isDirectory()) {
    //                 this.ObserverDel.removeObserver(curentPath);
    //                 this.deleteRecursive(curentPath);
    //                 this.systemDel(curentPath);
    //             } else
    //             if (el.isFile()) {
    //                 fs.unlink(curentPath, (err) => {
    //                     if (err) throw err;

    //                     //this.ObserverDel.addObserver(path.join(curentPath, '../')+'unlink');
    //                     //Рекурсивное удаление https://youtu.be/m-hMYMqnDvo?t=5131
                        
    //                     this.deleteRecursive(path.join(curentPath, '../'));
    //                     this.ObserverDel.removeObserver(curentPath);
    //                 });
    //             } else {
    //                 throw `${curentPath} - не определенный тип`;
    //             }
    //         });

    //         this.ObserverDel.removeObserver(folderPath);
    //     });
    // }

    // deleteRecursive(currentPath) {
    //     this.isEmpty(currentPath, (err, status) => {
    //         if (err) throw err;
            
    //         if (status) {    
    //             console.log(currentPath, this.ObserverDel.observers);
    //             console.log('--------------');
    //             this.ObserverDel.addObserver(currentPath+'_del');
    //             fs.rmdir(currentPath, (err) => {
    //                 if (err) throw err;
    //                 this.deleteRecursive(path.join(currentPath, '../'));
    //                 this.ObserverDel.removeObserver(currentPath+'_del');
    //             });
    //         }
    //     });
    // }
    
    // isEmpty(src, cb) {
    //     this.ObserverDel.addObserver(src+'_doubleReadDir');
    //     fs.readdir(src, (err, files) => {
    //         this.ObserverDel.removeObserver(src+'_doubleReadDir');
    //         if (err) return cb(err, null);
    //         if (files.length) {
    //             cb(null, false);
    //         } else {
    //             cb(null, true);
    //         }
    //     })
    // }

    // deleteFolderAndFiles(folderPath, callback) {
    //     this.ObserverDel = new Observer(() => {
    //         callback();
    //     });
    //     this.ObserverDel.start();
    //     this.systemDel(folderPath);
    // }
}