const router = require('express').Router();
const bcrypt = require('bcrypt');

/**
 * @swagger
 *  tags:
 *      name: Developer-Routes
 *      description: developer Utils
 */

/**
 * @swagger
 *  /developer/password-hash/{password}
 *      get:
 *          tags: [Developer-Routes]
 *          summary: hash data with bcrypt
 *          parameters:
 *          -   in: path
 *              type: string
 *              name: password
 *              required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/password-hash/:password",(req,res,next)=>{
    const {password} = req.params;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password,salt);
    return res.status(200).json({
        status:200,
        success:true,
        hashedPassword
    });
})

module.exports = {
    DeveloperRoutes : router
}