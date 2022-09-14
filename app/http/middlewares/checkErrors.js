const createHttpError = require("http-errors");

function multerErrorMapper(error,req,res,next){
    let message = '';
    if(error?.code === 'LIMIT_FILE_SIZE') message = 'حجم عکس آپلود شده بیش از حد مجاز است';
    else if(error?.code === 'LIMIT_PART_COUNT') message = 'تعداد عکس آپلود شده بیش از حد مجاز است';
    else if(error?.code === 'LIMIT_FILE_COUNT') message = 'تعداد عکس آپلود شده بیش از حد مجاز است';
    if(message.length>0) return next(createHttpError.BadRequest(message));
    else{
        next(createHttpError.BadRequest(error?.message));
    }
}

module.exports = {
    multerErrorMapper
}