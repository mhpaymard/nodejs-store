const createHttpError = require('http-errors');
const JWT = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require('./constants');
const { redisClient } = require('./init_redis');
function randomNumberGenerator(){
    return Math.floor((Math.random()*89999)+10000);
}
function signAccessToken(userID){
    return new Promise(async (resolve,reject)=>{
        try{
            const user = await UserModel.findById(userID);
            if(!user) return reject(createHttpError.BadRequest('حساب کاربری یافت نشد'))
            const payload = {
                mobile:user.mobile,
            };
            const options = {
                expiresIn:'1h'
            };
            JWT.sign(payload,ACCESS_TOKEN_SECRET_KEY,options,(err,token)=>{
                if(err) return reject(createHttpError.InternalServerError('خطای سرور'));
                return resolve(token);
            })
        }catch(err){
            reject(err);
        }
    })
}
function signRefreshToken(userID){
    return new Promise(async (resolve,reject)=>{
        try{
            const user = await UserModel.findById(userID);
            if(!user) return reject(createHttpError.BadRequest('حساب کاربری یافت نشد'))
            const payload = {
                mobile:user.mobile,
            };
            const options = {
                expiresIn:'1y'
            };
            JWT.sign(payload,REFRESH_TOKEN_SECRET_KEY,options,async (err,token)=>{
                if(err) return reject(createHttpError.InternalServerError('خطای سرور'));
                await redisClient.SETEX(user._id.toString(),(365*24*60*60),token);
                return resolve(token);
            })
        }catch(err){
            reject(err);
        }
    })
}
function verifyRefreshToken(token){
    return new Promise((resolve,reject)=>{
        JWT.verify(token,REFRESH_TOKEN_SECRET_KEY,async (err,payload)=>{
            if(err) return reject(createHttpError.Unauthorized('وارد حساب کاربری خود شوید'));
            const {mobile} = payload || {};
            const user = await UserModel.findOne({mobile},{password:0,otp:0});
            if(!user) return reject(createHttpError.Unauthorized('حساب کاربری یافت نشد'));
            const refreshToken = await redisClient.get(user._id.toString());
            if(token === refreshToken) return resolve({mobile,userID:user._id})
            return reject(createHttpError.Unauthorized('ورود مجدد به حساب کاربری انجام نشد'));
        })
    })
}
module.exports={
    randomNumberGenerator,
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken
}