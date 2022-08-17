const homeController = require('../../http/controllers/api/home.controller');

const router = require('express').Router();

/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description: api های صفحه اصلی وبسایت
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [IndexPage]
 *      description: get all need data for index page
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: not Found
 */
router.get('/',homeController.indexPage)

module.exports = {
    HomeRoutes:router
}