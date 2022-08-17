const {Types,Schema,model} = require('mongoose');

const sliderSchema = new Schema({
    title:{type:String,trim:true},
    text:{type:String},
    image:{type:String,required:true,trim:true},
    type:{type:String,trim:true,default:"main"}
},{
    timestamps:true
})

const SliderSchema = model('slider',sliderSchema);

module.exports = {
    SliderSchema
}