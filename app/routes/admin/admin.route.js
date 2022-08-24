const { CategoryRoutes } = require('./category.route');

const router = require('express').Router();

router.use('/category',CategoryRoutes);

module.exports = {
    AdminRoutes : router
}