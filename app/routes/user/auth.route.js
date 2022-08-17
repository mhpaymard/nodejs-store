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

/**
 * @swagger
 *  /user/refreshToken:
 *      post:
 *          summary: send refresh token for get new accessToken and refreshToken
 *          description: 
 *          tags: [User-Authentication]
 *          parameters:
 *              -   name: refreshToken
 *                  in: body
 *                  required: true
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: BadRequest
 *              401:
 *                  description: UnAuthorization
 *              500:
 *                  description: InternalServerError
 */

router.post('/refreshToken',UserAuthController.refreshToken)
module.exports = {
    UserAuthRoutes : router
}