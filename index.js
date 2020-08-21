//Подключаем модули
const fs = require('fs');
const path = require('path');


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
function readFolder(folderPath) {
    //Инициализирую массив
    let array_obj = [];
    
    try{
    //Читаю синхронно все файлы
    fs.readdirSync(folderPath, {
        withFileTypes: true,
        encoding: 'utf-8'
    }).forEach(el => {
        if (el.isDirectory()) {
            //Если файлы это папка то рекурсивно вызываю этуже функцию
            readFolder(path.join(folderPath, el.name)).forEach(element => {
                //прохожусь по результату циклом а кладу в массив
                array_obj.push(element);
            });
        } else {
            if (el.isFile()) {
                //если файлы это файл то формирую объект и записываю в массив
                obj_file = {
                    "file_name": el.name,//имя файлф
                    "file_second": el.name[0].toUpperCase(),//первая буква имени файла
                    "file_path": path.join(folderPath, el.name)//путь до файла
                }
                array_obj.push(obj_file);
            } else {
                //если файл ни папка и не файлы то ошибка
                console.error(`${path.join(folderPath,el.name)} - не определенный тип`);
                exit(2);
            }
        }
    });
    } catch (err){
        console.error(err);
        exit(1);
    }

    return array_obj;
}

//Функция создания папок c наведёным порядком
function systematizationFiles(systematization_folder_name,array_obj_path){
    //Проверяем есть ли результирующая папка
    //если нет то создаём
    try{
        fs.accessSync(systematization_folder_name,fs.constants.F_OK);
    }catch (err){
        fs.mkdirSync(systematization_folder_name);
    }

    //цикл по массиву с путями до файла
    array_obj_path.forEach(el=>{
        //Проверяем есть ли папка с именем начинающимся на первую букву названия файла
        //если нет то создаём
        try{
            fs.accessSync(path.join(systematization_folder_name,el.file_second),fs.constants.F_OK);
        }catch (err){
            fs.mkdirSync(path.join(systematization_folder_name,el.file_second));
        }

        //Копируем файл в итоговую
        fs.copyFileSync(el.file_path, path.join(path.join(systematization_folder_name,el.file_second),el.file_name));

    });
}

try{
    systematizationFiles(my_new_folder_path,readFolder(my_folder_path));
    console.log('Ok');
} catch(err){
    console.error(err);
}
