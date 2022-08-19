const { redisClient } = require('../modules/init_redis');
const { HomeRoutes } = require('./api/index.route');
const { UserAuthRoutes } = require('./user/auth.route');

const router = require('express').Router();

router.use('/',HomeRoutes);
router.use('/user',UserAuthRoutes);


module.exports = {
    AllRoutes : router
}