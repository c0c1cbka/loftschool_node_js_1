//Подключаем модули
const fs = require('fs');
const path = require('path');

const readFolder = require('./libs/readFolder');

//Определяем путь до исходной папки
let my_folder_path;
if (process.argv[2] == undefined) {
    my_folder_path = './randomFolder';
} else {
    my_folder_path = process.argv[2];
}

//Определяем путь до итоговой папки
let my_new_folder_path;
if (process.argv[3] == undefined) {
    my_new_folder_path = './beatifulFolder';
} else {
    my_new_folder_path = process.argv[3];
}

//Функция рекурсивного поиска всех файлов
//возвращает массив объектов 
// function readFolder(folderPath) {
    //Инициализирую массив
    // let array_obj = [];

    // fs.readdir(folderPath, {
    //     withFileTypes: true,
    //     encoding: 'utf-8'
    // }, (err, files) => {
    //     if (err) {
    //         throw err;
    //     }

    //     files.forEach(el=>{
    //         if(el.isDirectory()){
    //             readFolder(path.join(folderPath, el.name));
    //         }else
    //         if(el.isFile()){
                // //если файлы это файл то формирую объект и записываю в массив
                // obj_file = {
                //     "file_name": el.name,//имя файлф
                //     "file_second": el.name[0].toUpperCase(),//первая буква имени файла
                //     "file_path": path.join(folderPath, el.name)//путь до файла
                // }
                // array_obj.push(obj_file);
        //         console.log(path.join(folderPath, el.name));
        //     }else{
        //         throw `${path.join(folderPath,el.name)} - не определенный тип`;
        //     }
        // });
        // files.forEach(el => {
        //     if (el.isDirectory()) {
        //         //Если файлы это папка то рекурсивно вызываю этуже функцию
        //         readFolder(path.join(folderPath, el.name)).forEach(element => {
        //             //прохожусь по результату циклом а кладу в массив
        //             array_obj.push(element);
        //         });
        //     } else {
        //         if (el.isFile()) {
        //             //если файлы это файл то формирую объект и записываю в массив
        //             obj_file = {
        //                 "file_name": el.name,//имя файлф
        //                 "file_second": el.name[0].toUpperCase(),//первая буква имени файла
        //                 "file_path": path.join(folderPath, el.name)//путь до файла
        //             }
        //             array_obj.push(obj_file);
        //         } else {
        //             //если файл ни папка и не файлы то ошибка
        //             throw `${path.join(folderPath,el.name)} - не определенный тип`;
        //         }
        //     } 
        // });
//    });
  //  return array_obj;
//}

// console.log(
    // readFolder(my_folder_path);
    // );

console.log();