const { Router } = require('express');
const { AuthComponent } = require('../components');

const router = Router();
 
 /**
  * @swagger
  *  /v1/auth/signUp:
  *      post:
  *          summary: added a user
  *          security: [] # No security
  *          tags: ["Auths"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Auths'
  *          responses:
  *              200:
  *                  description: user add successfully
  *              401:
  *                  description: user not added
  */
 router.post('/signUp', AuthComponent.signUp)
 
 /**
  * @swagger
  *  /v1/auth/signIn:
  *      post:
  *          summary: login users
  *          security: [] # No security
  *          tags: ["Auths"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/login'
  *          responses:
  *              200:
  *                  description: login succesfully
  *              401:
  *                  description: user exists
  */
  router.post('/signIn', AuthComponent.signIn)


 /**
  * @swagger
  * tags:
  *  name: Auths
  *  description: endpoints for managing api Auths.
  * components:
  *  schemas:
  *      Auths:
  *          type: object
  *          required:
  *              -name
  *          properties:
  *              id:
  *                  type: string
  *              username:
  *                  type: string
  *              firstName:
  *                  type: string
  *              password:
  *                  type: string
  *              lastName:
  *                  type: string
  *              email:
  *                  type: string
  *          example:
  *              email: emailtestAuth@mail.com
  *              username: testAuth
  *              firstName: test
  *              password: tester1234
  *              lastName: auth
  *      login:
  *          type: object
  *          required:
  *              -email
  *              -password
  *          properties:
  *              password:
  *                  type: string
  *              email:
  *                  type: string
  *          example:
  *              email: emailtestAuth2@mail.com
  *              password: tester1234
  *      Error:    
  *          type: object
  *          required:
  *              -status
  *              -message
  *          properties:
  *              status: 
  *                  type: integer
  *                  description: HTTP status code
  *                  example: 400
  *              message:
  *                  type: string
  *                  description: Error description
  *                  example: entity no created
  */
 
 module.exports = router;