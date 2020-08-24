const fs = require('fs');
const path = require('path');
const Observer = require('./libs/Observer');

module.exports = class {
    constructor(callback) {
        this.arrayFilePath = [];
        this.Observer = new Observer(callback);
        this.Observer.start();
    }

    readFolder(folderPath) {
        this.Observer.addObserver(folderPath);
        fs.readdir(folderPath, {
            withFileTypes: true,
            encoding: 'utf-8'
        }, (err, files) => {
            if (err) {
                throw err;
            }
            files.forEach(el => {
                let curentPath = path.join(folderPath, el.name);
                this.Observer.addObserver(curentPath);

                if (el.isDirectory()) {
                    this.Observer.removeObserver(curentPath);
                    readFolder(curentPath);
                } else
                if (el.isFile()) {
                    let obj_file = {
                        "file_name": el.name, //имя файлф
                        "file_path": curentPath //путь до файла
                    }
                    this.arrayFilePath.push(obj_file);
                    this.Observer.removeObserver(curentPath);
                } else {
                    throw `${curentPath} - не определенный тип`;
                }
            });

            this.Observer.removeObserver(folderPath);
        });
    }

    getFolderFilePath(folderPath){
        
    }
}


// function readFolder(folderPath) {
//     //Инициализирую массив
//     let array_obj = [];

//     fs.readdir(folderPath, {
//         withFileTypes: true,
//         encoding: 'utf-8'
//     }, (err, files) => {
//         if (err) {
//             throw err;
//         }

//         files.forEach(el => {
//             if (el.isDirectory()) {
//                 readFolder(path.join(folderPath, el.name));
//             } else
//             if (el.isFile()) {
//                 console.log(path.join(folderPath, el.name));
//             } else {
//                 throw `${path.join(folderPath,el.name)} - не определенный тип`;
//             }
//         });
//     });
// }