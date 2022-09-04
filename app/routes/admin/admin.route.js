const { BlogAdminApiRoutes } = require('./blog.route');
const { CategoryRoutes } = require('./category.route');

const router = require('express').Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: action of admin (add,remove,edit and any do)
 *      -   name: Category(AdminPanel)
 *          description: all method and routes about category section
 *      -   name: Blog(AdminPanel)
 *          description: made blog management admin panel
 */

router.use('/category',CategoryRoutes);
router.use('/blogs',BlogAdminApiRoutes);

module.exports = {
    AdminRoutes : router
}