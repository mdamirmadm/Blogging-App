const multer = require('multer');
const path = require('path');

//Multer config
module.exports = multer({
    storage: multer.diskStorage({}),
    limits: {fileSize: 1024*1024*5}
    // fileFilter: (req, file, cb) => {
    //     let ext = path.extname(file.originalname);
    //     if(ext !== ".jpeg" && ext !== ".jpg" && ext !== ".png"){
    //         cb('File type not supported');
    //         return;
    //     }
    //     cb(null,true);

    // }
});