const { Router } = require('express');
const { FileComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/Files:
 *      get:
 *          summary: det all the Files;
 *          tags: ["Files"]
 *          responses:
 *              200:
 *                  description: get Files successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Files'
 *              401:
 *                  description: error in get Files
 */
 router.get('/', FileComponent.findAll)

 /**
  * @swagger
  *  /v1/Files/{id}:
  *      get:
  *          summary: get one File by id
  *          tags: ["Files"]
  *          responses:
  *              200:
  *                  description: get File succefully  
  *              401:
  *                  description: user not authorized to get File
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the File,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', FileComponent.findOne);
 
 /**
  * @swagger
  *  /v1/Files/{id}:
  *      delete:
  *          summary: delete a File
  *          tags: ["Files"]
  *          responses:
  *              200:
  *                  description: File deleted succesfully
  *              401:
  *                  description: user not authorized to delete Files
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the File,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', FileComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/Files/{id}:
  *      put:
  *          summary: put File in the DB
  *          tags: ["Files"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/Files'
  *          responses:
  *              200:
  *                  description: update File successfully
  *              401:
  *                  description: user not authorized to update Files
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the File,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', FileComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/Files:
  *      post:
  *          summary: added a File
  *          tags: ["Files"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Files'
  *          responses:
  *              200:
  *                  description: File add successfully
  *              401:
  *                  description: user not authorized to add Files
  */
 router.post('/', FileComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: Files
  *  description: endpoints for managing api Files.
  * components:
  *  schemas:
  *      Files:
  *          type: object
  *          required:
  *              -filename
  *              -key
  *              -storage
  *              -status
  *          properties:
  *              id:
  *                  type: string
  *              filename:
  *                  type: string,
  *              key:
  *                  type: string,
  *              url:
  *                  type: string,
  *              storage:
  *                  type: string,
  *              status:
  *                  type: string,
  *              description:
  *                  type: string,
  *          example:
  *              filename: archivo1
  *              key: archivo1
  *              url: ''
  *              storage: 'AWS'
  *              status: 'OK'
  *              description: archivo 1 to bucket aws
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