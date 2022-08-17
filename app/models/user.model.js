const {Types,Schema,model} = require('mongoose');

const userSchema = new Schema({
    first_name:{type:String,trim:true},
    last_name:{type:String,trim:true},
    username:{type:String,trim:true,lowercase:true},
    mobile:{type:String,trim:true,required:true,unique:true},
    email:{type:String,trim:true,lowercase:true},
    password:{type:String},
    otp:{type:Object,default:{
        code:0,
        expiresIn:0
    }},
    bills:{type:[],default:[]},
    discount:{type:Number,default:0},
    birthday:{type:String},
    roles:{type:[String],default:['USER']}
},{
    timestamps:true
})

const UserModel = model('user',userSchema);

module.exports = {
    UserModel
}