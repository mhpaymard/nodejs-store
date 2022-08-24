const { CategoryController } = require('../../http/controllers/admin/category.controller');

const router = require('express').Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: action of admin (add,remove,edit and any do)
 *      -   name: Category(AdminPanel)
 *          description: all method and routes about category section
 */


/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(AdminPanel)]
 *          summary: create new category title
 *          parameters:
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: title
 *              -   in: formData
 *                  type: string
 *                  name: parent
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
router.post('/add',CategoryController.addCategory);

/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get All parents of Category or Category Heads
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: badrequest
 *              401:
 *                  description: unauthorized
 *              500:
 *                  description: internalservererror
 */
router.get('/parents',CategoryController.getAllParents);

/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get children of parent Category
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  name: parent
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: badrequest
 *              401:
 *                  description: unauthorized
 *              500:
 *                  description: internalservererror
 */
router.get('/children/:parent',CategoryController.getChildOfParents);

/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get All Of Categories
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: badrequest
 *              401:
 *                  description: unauthorized
 *              500:
 *                  description: internalservererror
 */
router.get('/all',CategoryController.getAllCategories)

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Category(AdminPanel)]
 *          summary: remove category by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: badrequest
 *              401:
 *                  description: unauthorized
 *              500:
 *                  description: internalservererror
 */
router.delete('/remove/:id',CategoryController.removeCategory)

/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: find category by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: badrequest
 *              401:
 *                  description: unauthorized
 *              500:
 *                  description: internalservererror
 */
router.get('/:id',CategoryController.getCategoryById)

 /**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch:
 *          tags: [Category(AdminPanel)]
 *          summary: edit or update title of category with objectid
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  required: true
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: badrequest
 *              401:
 *                  description: unauthorized
 *              500:
 *                  description: internalservererror
 */
router.patch('/update/:id',CategoryController.getCategoryById)

module.exports = {
    CategoryRoutes : router
}