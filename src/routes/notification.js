const { Router } = require('express');
const { NotificationComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/notifications:
 *      get:
 *          summary: get all the Notifications;
 *          tags: ["notifications"]
 *          responses:
 *              200:
 *                  description: get Notifications successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/notifications'
 *              401:
 *                  description: error in get Notifications
 */
 router.get('/', NotificationComponent.findAll)

 /**
  * @swagger
  *  /v1/notifications/{id}:
  *      get:
  *          summary: get one Notifications by id
  *          tags: ["notifications"]
  *          responses:
  *              200:
  *                  description: get Notifications succefully  
  *              401:
  *                  description: user not authorized to get Notifications
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the notification,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', NotificationComponent.findOne);
 
 /**
  * @swagger
  *  /v1/notifications/{id}:
  *      delete:
  *          summary: delete a Notifications
  *          tags: ["notifications"]
  *          responses:
  *              200:
  *                  description: Notifications deleted succesfully
  *              401:
  *                  description: user not authorized to delete Notifications
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Notification,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', NotificationComponent.deleteOne);
 
 
 /**
  * @swagger
  *  /v1/notifications:
  *      post:
  *          summary: added a Notifications
  *          tags: ["notifications"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/notifications'
  *          responses:
  *              200:
  *                  description: Notifications add successfully
  *              401:
  *                  description: user not authorized to add Notifications
  */
 router.post('/', NotificationComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: Notifications
  *  description: endpoints for managing api Notifications.
  * components:
  *  schemas:
  *      notifications:
  *          type: object
  *          required:
  *              -message
  *              -type
  *          properties:
  *              id:
  *                  type: string
  *              message:
  *                  type: string,
  *              type:
  *                  type: string,
  *              isRead:
  *                  type: boolean,
  *          example:
  *              message: login success,
  *              type: LOGIN,
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