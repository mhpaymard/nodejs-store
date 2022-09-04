const { AdminBlogController } = require('../../http/controllers/admin/blog.controller');
const { multerErrorMapper } = require('../../http/middlewares/checkErrors');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { uploadFile } = require('../../modules/multer');

const router = require('express').Router();

/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summary: get all blogs
 *          responses:
 *              200:
 *                  description: success - get array of blogs
 *              401:
 *                  description: unauthorized
 *              500:
 *                  description: internalservererror
 */
router.get('/',AdminBlogController.getListOfBlogs);

/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          tags: [Blog(AdminPanel)]
 *          summary: create Blog Document
 *          consumes: 
 *              - multipart/form-data
 *          parameters:
 *              -   in: formData
 *                  name: title
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: text
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: short_text
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: tags
 *                  example: tag1#tag2#tag3
 *                  type: string
 *              -   in: formData
 *                  name: category
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: image
 *                  type: file
 *                  required: true
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: badrequest
 *              401:
 *                  description: unauthorized
 *              500:
 *                  description: internalservererror
 */
router.post('/add',uploadFile.single('image'),multerErrorMapper,stringToArray('tags','category'),AdminBlogController.createBlog);

module.exports = {
    BlogAdminApiRoutes : router
}