const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../models/category.model");
const { addCategorySchema, updateCategorySchema } = require("../../validators/admin/category.schema");
const Controller = require("../controller");

class CategoryController extends Controller{
    async addCategory(req,res,next){
        try{
            const validation = await addCategorySchema.validateAsync(req.body);
            const {title,parent} = validation;
            if(parent){
                const parentIsExist = await CategoryModel.findById(parent);
                if(!parentIsExist) throw createHttpError.BadRequest('شناسه وارد شده صحیح نمی باشد');
            }
            const category = await CategoryModel.create({title,parent});
            if(!category) throw createHttpError.InternalServerError('خطای داخلی');
            return res.status(201).json({
                data:{
                    status:201,
                    message:'دسته بندی با موفقیت اضافه شد'
                }
            })
        }catch(err){
            next(err);
        }
    }
    async removeCategory(req,res,next){
        try{
            const {id} = req.params;
            const category = await this.checkExistCategory(id);
            // const deleteResult = await CategoryModel.deleteOne({_id:category._id});
            const deleteResult = await CategoryModel.deleteMany({
                $or:[
                    {
                        _id:category._id
                    },
                    {
                        parent:category._id
                    }
                ]
            })
            if(deleteResult.deletedCount == 0) throw createHttpError.InternalServerError('حذف دسته بندی انجام نشد');
            return res.status(200).json({
                data:{
                    statusCode:200,
                    message:"حذف دسته بندی با موفقیت انجام شد"
                }
            })
        }catch(err){
            next(err);
        }
    }
    async editCategory(req,res,next){
        try{
            const {id} = req.params;
            const validation = await updateCategorySchema.validateAsync(req.body)
            const {title} = validation;
            const category = await this.checkExistCategory(id);
            const resultOfUpdate = await CategoryModel.updateOne({_id:category._id},{
                $set:{
                    title
                }
            });
            if(resultOfUpdate.modifiedCount==0) throw createHttpError.InternalServerError('بروزرسانی دسته بندی با خطا مواجه شد');
            return res.status(200).json({
                data:{
                    statusCode:200,
                    message:'دسته بندی با موفقیت بروزرسانی شد'
                }
            })
        }catch(err){
            next(err);
        }
    }
    async getAllCategories(req,res,next){
        try{
            // const categories = await CategoryModel.aggregate([
            //     {
            //         $lookup:{
            //             from:'categories',
            //             localField:'_id',
            //             foreignField:'parent',
            //             as:'children'
            //         }
            //     },
            //     {
            //         $project:{
            //             __v:0,
            //             'children.__v':0,
            //             'children.parent':0
            //         }
            //     },
            //     {
            //         $match:{
            //             parent:undefined
            //         }
            //     }
            // ]);
            
            // const categories = await CategoryModel.aggregate([
            //     {
            //         $match:{
            //             parent:undefined
            //         }
            //     },
            //     {
            //         $graphLookup:{
            //             from:'categories',
            //             startWith:'$_id',
            //             connectFromField:'_id',
            //             connectToField:'parent',
            //             maxDepth:6,
            //             depthField:'depth',
            //             as:'children'
            //         }
            //     },
            //     {
            //         $project:{
            //             __v:0,
            //             'children.__v':0,
            //         }
            //     }
            // ])

            const categories = await CategoryModel.find({parent:undefined},{__v:0})
            return res.status(200).json({
                data:{
                    statusCode:200,
                    categories
                }
            })
        }catch(err){
            next(err);
        }
    }
    async getCategoryById(req,res,next){
        try{
            const {id} = req.params;
            const checkCategory = await this.checkExistCategory(id);
            const category = await CategoryModel.aggregate([
                {
                    $match:{
                        _id:checkCategory._id
                    }
                },
                {
                    $graphLookup:{
                        from:'categories',
                        startWith:'$_id',
                        connectFromField:'_id',
                        connectToField:'parent',
                        maxDepth:6,
                        depthField:'depth',
                        as:'children'
                    }
                },
                {
                    $project:{
                        __v:0,
                        'children.__v':0,
                    }
                }
            ])
            return res.status(200).json({
                data:{
                    statusCode:200,
                    category
                }
            })
        }catch(err){
            next(err);
        }
    }
    async getAllParents(req,res,next){
        try{
            const parents = await CategoryModel.find({parent:undefined},{__v:0});
            return res.status(200).json({
                data:{
                    statusCode:200,
                    parents
                }
            })
        }catch(err){
            next(err);
        }
    }
    async getChildOfParents(req,res,next){
        try{
            const {parent} = req.params;
            const children = await CategoryModel.find({parent},{__v:0,parent:0});
            return res.status(200).json({
                data:{
                    statusCode:200,
                    children
                }
            })
        }catch(err){
            next(err);
        }
    }
    async checkExistCategory(id){
        const category = await CategoryModel.findById(id);
        if(!category) throw createHttpError.NotFound('دسته بندی موردنظر یافت نشد');
        return category;
    }
}

module.exports = {
    CategoryController : new CategoryController()
}