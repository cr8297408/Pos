const { Router } = require('express');
const { ChatComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/Chats:
 *      get:
 *          summary: det all the Chats;
 *          tags: ["Chats"]
 *          responses:
 *              200:
 *                  description: get Chats successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Chats'
 *              401:
 *                  description: error in get Chats
 */
 router.get('/', ChatComponent.findAll)

 /**
  * @swagger
  *  /v1/Chats/{id}:
  *      get:
  *          summary: get one Chat by id
  *          tags: ["Chats"]
  *          responses:
  *              200:
  *                  description: get Chat succefully  
  *              401:
  *                  description: user not authorized to get Chat
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Chat,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', ChatComponent.findOne);
 
 /**
  * @swagger
  *  /v1/Chats/{id}:
  *      delete:
  *          summary: delete a Chat
  *          tags: ["Chats"]
  *          responses:
  *              200:
  *                  description: Chat deleted succesfully
  *              401:
  *                  description: user not authorized to delete Chats
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Chat,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', ChatComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/Chats/{id}:
  *      put:
  *          summary: put Chat in the DB
  *          tags: ["Chats"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/Chats'
  *          responses:
  *              200:
  *                  description: update Chat successfully
  *              401:
  *                  description: user not authorized to update Chats
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Chat,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', ChatComponent.updateOne);

 
 /**
  * @swagger
  *  /v1/Chats:
  *      post:
  *          summary: added a Chat
  *          tags: ["Chats"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Chats'
  *          responses:
  *              200:
  *                  description: Chat add successfully
  *              401:
  *                  description: user not authorized to add Chats
  */
 router.post('/', ChatComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: Chats
  *  description: endpoints for managing api Chats.
  * components:
  *  schemas:
  *      Chats:
  *          type: object
  *          required:
  *              -name
  *          properties:
  *              id:
  *                  type: string
  *              name:
  *                  type: string
  *              description:
  *                  type: string
  *              users: 
  *                  type: array             
  *              isPrivate:
  *                  type: boolean
  *          example:
  *              name: room1
  *              users: {'mario': 'socketId'}     
  *              description: hola room1     
  *              isPrivate: false
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