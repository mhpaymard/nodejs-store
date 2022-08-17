const {Types,Schema,model} = require('mongoose');

const productSchema = new Schema({
    title:{type:String,required:true,trim:true},
    short_desc:{type:String,required:true},
    total_desc:{type:String,required:true},
    images:{type:[String],required:true,trim:true},
    tags:{type:[String],required:true,trim:true,default:[]},
    category:{type:Types.ObjectId,default:[]},
    comments:{type:[],default:[]},
    like:{type:[Types.ObjectId],default:[]},
    dislike:{type:[Types.ObjectId],default:[]},
    bookmark:{type:[Types.ObjectId],default:[]},
    price:{type:Number,default:0},
    discount:{type:Number,default:0},
    count:{type:Number},
    type:{type:String,required:true},
    time:{type:String},
    format:{type:String},
    teacher:{type:Types.ObjectId},
    size:{type:Object},
    feature:{
        
    }
},{
    timestamps:true
})

const ProductModel = model('product',productSchema);

module.exports = {
    ProductModel
}