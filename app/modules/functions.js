const fs = require('fs');
const path = require('path');

const createHttpError = require('http-errors');
const JWT = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require('./constants');
const { redisClient } = require('./init_redis');
const { compareSync } = require('bcrypt');
function randomNumberGenerator(){
    return Math.floor((Math.random()*89999)+10000);
}
function randomUIdGenerator(){
    const letter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomString = '';
    while(randomString.length<5){
        randomString += `${letter?.[Math.floor(Math.random()*letter.length)] || ''}`;
    }
    return randomString;
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
                expiresIn:'1d'
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
function deleteFileInPublic(fileAddress){
    const filePath = path.join(__dirname,'..','..','public',fileAddress);
    fs.unlinkSync(filePath);
}
module.exports={
    randomNumberGenerator,
    deleteFileInPublic,
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    randomUIdGenerator
}