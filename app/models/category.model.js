const {Types,Schema,model} = require('mongoose');

const categorySchema = new Schema({
    title:{type:String,required:true,trim:true},
    parent:{type:Types.ObjectId,default:undefined}
},{
    timestamps:true
})

const CategoryModel = model('category',categorySchema);

module.exports = {
    CategoryModel
}