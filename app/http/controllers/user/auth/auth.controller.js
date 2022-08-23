const createHttpError = require("http-errors");
const { UserModel } = require("../../../../models/user.model");
const { randomNumberGenerator, signAccessToken, verifyRefreshToken, signRefreshToken } = require("../../../../modules/functions");
const { getOtpSchema, checkOtpSchema } = require("../../../validators/user/auth.schema");
const { EXPIRES_IN, ROLES } = require('../../../../modules/constants')
const Controller = require("../../controller");

class UserAuthController extends Controller{
    async getOtp(req,res,next){
        try{
            const validation = await getOtpSchema.validateAsync(req.body);
            const {mobile} = validation;
            const code = randomNumberGenerator();
            const result = await this.saveUser(mobile,code);
            if(!result)throw createHttpError.BadRequest('ورود با خطا مواحه شد');
            return res.status(200).json({
                data:{
                    statusCode:200,
                    message:"کد اعتبارسنجی با موفقیت برای شما ارسال شد",
                    code,
                    mobile
                }
            })
        }catch(error){
            next(error);
        }
    }
    
    async checkOtp(req,res,next){
        try{
            const validation = await checkOtpSchema.validateAsync(req.body);
            const {mobile,code} = validation;
            const user = await UserModel.findOne({mobile,"otp.code":parseInt(code)});
            if(!user) throw createHttpError.BadRequest('کد وارد شده نادرست است');
            const now = Date.now();
            if(+user.otp.expiresIn < now) throw createHttpError.Unauthorized('کد وارد شده منقضی شده است');
            const accessToken = await signAccessToken(user._id);
            const refreshToken = await signRefreshToken(user._id);

            return res.status(200).json({
                data:{
                    accessToken,
                    refreshToken
                }
            })
        }catch(error){
            next(error);
        }
    }
    async refreshToken(req,res,next){
        try{
            const {refreshToken} = req.body;
            if(!refreshToken) throw createHttpError.BadRequest('خطا بابت مقادیر ناکافی');
            const {mobile,userID} = await verifyRefreshToken(refreshToken);
            const accessToken = await signAccessToken(userID);
            const newRefreshToken = await signRefreshToken(userID);
            return res.status(200).json({
                data:{
                    accessToken,
                    refreshToken:newRefreshToken
                }
            })
        }catch(err){
            next(err);
        }
    }
    async saveUser(mobile,code){
        const result = await this.checkExistUser(mobile);
        if(result){
            return (await this.updateUser(mobile,{
                otp:{
                    code,
                    expiresIn : EXPIRES_IN()
                }
            }));
        }
        return !!(await UserModel.create({
            mobile,
            otp:{
                code,
                expiresIn : EXPIRES_IN()
            },
            Roles:[ROLES.USER]
        }));
    }
    async checkExistUser(mobile){
        const user = await UserModel.findOne({mobile});
        return !!user;
    }
    async updateUser(mobile,objectData = {}){
        Object.keys(objectData).forEach(key=>{
            if([""," ",0,null,undefined,"0",NaN].includes(objectData[key])) delete objectData[key];
            if(!["first_name","last_name","otp",'bills','discount','birthday'].includes(key)) delete objectData[key];
        })
        const updateResult = await UserModel.updateOne({mobile},{
            $set:objectData
        })
        return !!updateResult.modifiedCount;
    }
}

module.exports = {
    UserAuthController : new UserAuthController()
}