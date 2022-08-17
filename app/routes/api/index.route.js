const homeController = require('../../http/controllers/api/home.controller');
const { verifyAccessToken } = require('../../http/middlewares/verifyAccessToken');

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
 *      parameters:
 *          -   in: header
 *              name: accessToken
 *              example: Bearer YourToken
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: not Found
 */
router.get('/',verifyAccessToken,homeController.indexPage)

module.exports = {
    HomeRoutes:router
}