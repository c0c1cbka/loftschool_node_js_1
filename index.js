const fs = require('fs');
const path = require('path');

fs.readdir('./randomFolder', {
    withFileTypes: true,
    encoding : 'utf-8'
}, (err, files) => {
    console.log(files);
});