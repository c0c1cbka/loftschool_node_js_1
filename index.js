const fs = require('fs');
const path = require('path');

const myFolderPath = './randomFolder';

function readFolder(folderPath){
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
            readFolder(path.join(folderPath,el.name));
        }else{
            if (el.isFile()) {
                console.log(`${path.join(folderPath,el.name)} - файл`);
            }
        }
    });
});
}


readFolder(myFolderPath);