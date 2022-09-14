const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { randomUIdGenerator } = require('./functions');
const createHttpError = require('http-errors');

function createRoute(req){
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const day = date.getDate().toString();
    const directory = path.join(__dirname,'..','..','public','uploads','blogs',year,month,day);
    req.body.fileUploadPath = path.join('uploads','blogs',year,month,day)
    fs.mkdirSync(directory,{recursive:true});
    return directory;
}

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        const filePath = createRoute(req);
        cb(null,filePath);
    },
    filename:(req,file,cb)=>{
        const ext = path.extname(file.originalname);
        const fileName = `${Date.now()}${randomUIdGenerator()}${ext}`;
        req.body.fileName = fileName;
        cb(null,fileName);
    },
    
})

const uploadFile = multer({
    storage,
    limits:{
        fileSize: 1024*1024*10, //10MB
        files:1
    },
    fileFilter:(req,file,cb)=>{
        const mimeTypes = ['image/png','image/jpg','image/jpeg']
        if(!mimeTypes.includes(file.mimetype)) return cb(createHttpError.BadRequest('فرمت عکس مجاز نیست'));
        return cb(null,true);
    }
})

module.exports = {
    uploadFile
}