const { CategoryController } = require('../../http/controllers/admin/category.controller');

const router = require('express').Router();

/**
 * @swagger
 *  tags:
 *      name: Admin-Panel
 *      description: action of admin (add,remove,edit and any do)
 */

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Admin-Panel]
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
 *          tags: [Admin-Panel]
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
 *          tags: [Admin-Panel]
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
 *          tags: [Admin-Panel]
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
 *          tags: [Admin-Panel]
 *          summary: get All Of Categories
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

module.exports = {
    CategoryRoutes : router
}