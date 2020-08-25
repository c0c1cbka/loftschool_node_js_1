//Подключаем модули
const folders = require('./libs/folders');

//инициализируем объект folders
let myFolder = new folders;

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

myFolder.getFilesInFolder(my_folder_path,(files)=>{
    console.log('я всё прочёл');
    myFolder.systematizationCopyFiles(my_new_folder_path,files,()=>{
        console.log('я всё скопировал');
        myFolder.deleteFolderAndFiles(my_folder_path,()=>{
            console.log('я всё удалил');
        });
    });
});