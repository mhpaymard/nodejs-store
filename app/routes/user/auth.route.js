const { UserAuthController } = require('../../http/controllers/user/auth/auth.controller');

const router = require('express').Router();

/**
 * @swagger
 *  tags:
 *      name: User-Authentication
 *      description: user-auth section
 */

/**
 * @swagger
 *  /user/get-otp:
 *      post:
 *          summary: get otp code with phone
 *          description: one time password(otp) login
 *          tags: [User-Authentication]
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phoneNumber
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: BadRequest
 *              401:
 *                  description: UnAuthorization
 *              500:
 *                  description: InternalServerError
 */


router.post('/get-otp',UserAuthController.getOtp);

/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          summary: check otp code in user controller
 *          description: check otp with mobile and expireDate
 *          tags: [User-Authentication]
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phoneNumber
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: otp code
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: SuccessLogin
 *              400:
 *                  description: BadRequest
 *              401:
 *                  description: UnAuthorization
 *              500:
 *                  description: InternalServerError
 */

router.post('/check-otp',UserAuthController.checkOtp);

module.exports = {
    UserAuthRoutes : router
}