const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/upload/')
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})

module.exports = multer({storage: storage});