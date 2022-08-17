const Joi = require('joi');
const getOtpSchema = Joi.object({
    mobile:Joi.string().trim().pattern(/^09[0-9]{9}$/).required().error(new Error('شماره موبایل وارد شده نادرست است'))
})
const checkOtpSchema = Joi.object({
    mobile:Joi.string().trim().pattern(/^09[0-9]{9}$/).required().error(new Error('شماره موبایل وارد شده نادرست است')),
    code:Joi.string().trim().pattern(/^[0-9]{4,6}$/).required().error(new Error('کد ارسال شده نادرست است'))
})
module.exports = {
    getOtpSchema,
    checkOtpSchema
}