const {Types,Schema,model} = require('mongoose');

const categorySchema = new Schema({
    title:{type:String,required:true,trim:true},
    parent:{type:Types.ObjectId,ref:'category',default:undefined}
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    },
    id:false
});

categorySchema.virtual('children',{
    ref: 'category',
    localField:'_id',
    foreignField:'parent'
})
function autoPopulation(next){
    this.populate([{path:'children',select:{__v:0,id:0}}]);
    next()
}
categorySchema.pre('findOne',autoPopulation).pre('find',autoPopulation);
const CategoryModel = model('category',categorySchema);
module.exports = {
    CategoryModel
}