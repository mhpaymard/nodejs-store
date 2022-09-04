const createHttpError = require('http-errors');
const Joi = require('joi');
const createBlogSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest('عنوان بلاگ صحیح نمی باشد')),
    text: Joi.string().error(createHttpError.BadRequest('متن ارسال شده صحیح نمی باشد')),
    short_text: Joi.string().error(createHttpError.BadRequest('متن کوچک ارسال شده صحیح نمی باشد')),
    image: Joi.string().error(createHttpError.BadRequest('تصویر ارسال شده صحیح نمی باشد')),
    tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest('برچسب ها نمی تواند بیش از 20 آیتم باشد')),
    category: Joi.array().error(createHttpError.BadRequest('ایدی دسته بندی معتبر نمی باشد'))
})
const updateBlogSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest('عنوان بلاگ صحیح نمی باشد'))
})
module.exports = {
    createBlogSchema,
    updateBlogSchema
}