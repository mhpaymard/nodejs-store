const { AdminRoutes } = require('./admin/admin.route');
const { HomeRoutes } = require('./api/index.route');
const { DeveloperRoutes } = require('./developer.route');
const { UserAuthRoutes } = require('./user/auth.route');

const router = require('express').Router();

router.use('/',HomeRoutes);
router.use('/admin',AdminRoutes);
router.use('/developer',DeveloperRoutes);
router.use('/user',UserAuthRoutes);

module.exports = {
    AllRoutes : router
}