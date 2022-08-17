const createHttpError = require("http-errors");
const { UserModel } = require("../../models/user.model");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../modules/constants");

const JWT = require('jsonwebtoken');

function verifyAccessToken(req,res,next){
    const [bearer,token] = req?.headers?.accessToken?.split(' ') || req?.headers?.accesstoken?.split(' ') || [];
    if(!token || bearer?.toLowerCase()!=='bearer') return next(createHttpError.Unauthorized('مجددا وارد حساب کاربری خود شوید'))
    JWT.verify(token,ACCESS_TOKEN_SECRET_KEY,async (err,payload)=>{
        if(err) return next(createHttpError.Unauthorized('وارد حساب کاربری خود شوید'));
        const {mobile} = payload || {};
        const user = await UserModel.findOne({mobile},{password:0,otp:0});
        if(!user) return next(createHttpError.Unauthorized('حساب کاربری یافت نشد'))
        req.user = user;
        return next();
    })
}
module.exports = {
    verifyAccessToken
}