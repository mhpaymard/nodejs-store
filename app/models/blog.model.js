const {Types,Schema,model} = require('mongoose');

const commentSchema = new Schema({

})

const blogSchema = new Schema({
    author:{type:Types.ObjectId,required:true},
    title:{type:String,required:true,trim:true},
    text:{type:String,required:true},
    image:{type:String,required:true,trim:true},
    tags:{type:[String],default:[]},
    category:{type:Types.ObjectId,required:true},
    comments:{type:[],default:[]},
    like:{type:[Types.ObjectId],default:[]},
    dislike:{type:[Types.ObjectId],default:[]},
    bookmark:{type:[Types.ObjectId],default:[]}
},{
    timestamps:true
})

const BlogModel = model('blog',blogSchema);

module.exports = {
    BlogModel
}