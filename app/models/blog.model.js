const {Types,Schema,model} = require('mongoose');

const commentSchema = new Schema({
    user:{type:Types.ObjectId,ref:"users",required:true},
    comment:{type:String,required:true},
    createdAt:{type:Date,default:Date.now()},
    parent:{type:Types.ObjectId}
})

const blogSchema = new Schema({
    author:{type:Types.ObjectId,required:true},
    title:{type:String,required:true,trim:true},
    text:{type:String,required:true},
    short_text:{type:String,required:true},
    image:{type:String,required:true,trim:true},
    tags:{type:[String],default:[]},
    category:{type:[Types.ObjectId],required:true}, 
    comments:{type:[commentSchema],default:[]},
    like:{type:[Types.ObjectId],ref:"users",default:[]},
    dislike:{type:[Types.ObjectId],ref:"users",default:[]},
    bookmark:{type:[Types.ObjectId],ref:"users",default:[]}
},{
    timestamps:true,
    versionKey:false
})

const BlogModel = model('blog',blogSchema);

module.exports = {
    BlogModel
}