const Joi = require('joi');
const { MongoIDPattern } = require('../../../modules/constants');

const addCategorySchema = Joi.object({
    title:Joi.string().trim().min(3).max(30).required().error(new Error('موضوع دسته بندی الزامی و می بایست حداقل 3 و حداکثر 30 کاراکتر باشد')),
    parent:Joi.string().pattern(MongoIDPattern).allow('').error(new Error('شناسه ارسال شده صحیح نمی باشد'))
})
const updateCategorySchema = Joi.object({
    title:Joi.string().trim().min(3).max(30).required().error(new Error('موضوع دسته بندی الزامی و می بایست حداقل 3 و حداکثر 30 کاراکتر باشد')),
})

module.exports = {
    addCategorySchema,
    updateCategorySchema
}