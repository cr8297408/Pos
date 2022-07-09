const { Router } = require('express');
const { MessageComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/Messages:
 *      get:
 *          summary: det all the Messages;
 *          tags: ["Messages"]
 *          responses:
 *              200:
 *                  description: get Messages successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Messages'
 *              401:
 *                  description: error in get Messages
 */
 router.get('/', MessageComponent.findAll)

 /**
  * @swagger
  *  /v1/Messages/{id}:
  *      get:
  *          summary: get Message by chat id
  *          tags: ["Messages"]
  *          responses:
  *              200:
  *                  description: get Messages succefully  
  *              401:
  *                  description: user not authorized to get Message
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Message,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', MessageComponent.findOne);
 
 /**
  * @swagger
  *  /v1/Messages/{id}:
  *      delete:
  *          summary: delete a Message
  *          tags: ["Messages"]
  *          responses:
  *              200:
  *                  description: Message deleted succesfully
  *              401:
  *                  description: user not authorized to delete Messages
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Message,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', MessageComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/Messages/{id}:
  *      put:
  *          summary: put Message in the DB
  *          tags: ["Messages"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/Messages'
  *          responses:
  *              200:
  *                  description: update Message successfully
  *              401:
  *                  description: user not authorized to update Messages
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Message,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', MessageComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/Messages:
  *      post:
  *          summary: added a Message
  *          tags: ["Messages"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Messages'
  *          responses:
  *              200:
  *                  description: Message add successfully
  *              401:
  *                  description: user not authorized to add Messages
  */
 router.post('/', MessageComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: Messages
  *  description: endpoints for managing api Messages.
  * components:
  *  schemas:
  *      Messages:
  *          type: object
  *          required:
  *              -ChatId
  *          properties:
  *              id:
  *                  type: string
  *              text:
  *                  type: string,
  *              emoticon:
  *                  type: string,
  *              file:
  *                  type: string,
  *              tipeFile:
  *                  type: string,
  *              estate:
  *                  type: string,
  *          example:
  *              ChatId: idChat
  *              text: 'hola mundo'
  *              emoticon: ''
  *              tipeFile: 
  *              estate: 
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