const { Router } = require('express');
const { UserComponent } = require('../components');

const User = require('./user');
const UserService = require('../components/user/service');

const router = Router();


/**
 * @swagger
 *  /v1/users:
 *      get:
 *          summary: det all the users;
 *          tags: ["users"]
 *          responses:
 *              200:
 *                  description: get users successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/users'
 *              401:
 *                  description: error in get users
 */
 router.get('/', UserComponent.findAll)

 /**
  * @swagger
  *  /v1/users/{id}:
  *      get:
  *          summary: get one user by id
  *          tags: ["users"]
  *          responses:
  *              200:
  *                  description: get user succefully  
  *              401:
  *                  description: user not authorized to get user
  *          parameters: [
  *           {
  *              name: idProducto,
  *              in: path,
  *              description: id con el que está registrado en el sistema el producto a eliminar,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', UserComponent.findOne);
 
 /**
  * @swagger
  *  /v1/users/{id}:
  *      delete:
  *          summary: delete a user
  *          tags: ["users"]
  *          responses:
  *              200:
  *                  description: user deleted succesfully
  *              401:
  *                  description: user not authorized to delete users
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the user,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', UserComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/users/{id}:
  *      put:
  *          summary: put user in the DB
  *          tags: ["users"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/users'
  *          responses:
  *              200:
  *                  description: update user successfully
  *              401:
  *                  description: user not authorized to update users
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the user,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', UserComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/users:
  *      post:
  *          summary: added a user
  *          tags: ["users"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/users'
  *          responses:
  *              200:
  *                  description: user add successfully
  *              401:
  *                  descripion: user not authorized to add users
  */
 router.post('/', UserComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: users
  *  description: endpoints for managing api users.
  * components:
  *  schemas:
  *      users:
  *          type: object
  *          required:
  *              -name
  *              -accountingAccount
  *          properties:
  *              id:
  *                  type: string
  *              name:
  *                  type: string,
  *              accountingAccount:
  *                    type: string
  *          example:
  *              username: user prueba
  *              password: pass123
  *              email: email@test.com
  *              firstName: user
  *              lastName: test
  *              roles: {}
  *              profile: {}
  *              avatarFile: avaatarlink
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