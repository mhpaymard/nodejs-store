const { createBlogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");

class AdminBlogController extends Controller{
    async createBlog(req,res,next){
        try{
            return res.json(req.body);
            const blogDataBody = await createBlogSchema.validateAsync(req.body);
        }catch(error){
            next(error);
        }
    }
    async getBlogById(req,res,next){
        try{
            
        }catch(error){
            next(error);
        }
    }
    async getListOfBlogs(req,res,next){
        try{
            return res.status(200).json({
                data:{
                    statusCode:200,
                    blogs:[]
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
}

module.exports = {
    AdminBlogController:new AdminBlogController()
}