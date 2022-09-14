const createHttpError = require('http-errors');
const path = require('path');
const { BlogModel } = require('../../../models/blog.model');
const { deleteFileInPublic } = require('../../../modules/functions');
const {Types} = require('mongoose');
const { createBlogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");

class AdminBlogController extends Controller{
    async createBlog(req,res,next){
        try{
            const blogDataBody = await createBlogSchema.validateAsync(req.body);
            const image = path.join(blogDataBody.fileUploadPath,blogDataBody.fileName).replace(new RegExp(/\\/g),'/');
            req.body.image = image;
            const {title,text,short_text,category,tags} = blogDataBody;
            const blog = await BlogModel.create({
                title,
                text,
                short_text,
                category,
                tags,
                image,
                author:req.user._id
            });
            return res.status(201).json({
                data:{
                    statusCode:201,
                    message:'بلاگ با موفقیت ایجاد شد'
                }
            })
        }catch(error){
            deleteFileInPublic(req.body.image);
            next(error);
        }
    }
    async getBlogById(req,res,next){
        try{
            const {id} = req.params;
            const blog = await this.findBlog({_id:Types.ObjectId(id)});
            return res.status(200).json({
                data:{
                    statusCode:200,
                    blog
                }
            })
        }catch(error){
            next(error);
        }
    }
    async getListOfBlogs(req,res,next){
        try{
            const blogs = await BlogModel.aggregate([
                {
                    $match:{}
                },
                {
                    $lookup:{
                        from:'users',
                        localField:'author',
                        foreignField:'_id',
                        as:'author'
                    }
                },
                {
                    $unwind:'$author'
                },
                {
                    $lookup:{
                        from:'categories',
                        localField:'category',
                        foreignField:'_id',
                        as:'category'
                    }
                },
                {
                    $unwind:'$category'
                },
                {
                    $project:{
                        "author.otp":0,
                        "author.bills":0,
                        "author.discount":0,
                        "author.__v":0,
                        "category.__v":0,
                        "author.roles":0,
                        "author.updatedAt":0,
                        "author.createdAt":0,
                    }
                }
            ]);
            return res.status(200).json({
                data:{
                    statusCode:200,
                    blogs
                }
            })
        }catch(error){
            next(error);
        }
    }
    async getCommentsOfBlog(req,res,next){
        try{
            
        }catch(error){
            next(error);
        }
    }
    async deleteBlogById(req,res,next){
        try{
            
        }catch(error){
            next(error);
        }
    }
    async updateBlogById(req,res,next){
        try{
            
        }catch(error){
            next(error);
        }
    }
    async findBlog(query={}){
        const blog = await BlogModel.findOne(query).populate([{path:'category'},{path:'author'}]);
        if(!blog) throw createHttpError.NotFound('مقاله ای یافت نشد');
        return blog;
    }

}

module.exports = {
    AdminBlogController:new AdminBlogController()
}