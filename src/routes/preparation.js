const { Router } = require('express');
const { PreparationComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/Preparations:
 *      get:
 *          summary: det all the Preparations;
 *          tags: ["Preparations"]
 *          responses:
 *              200:
 *                  description: get Preparations successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Preparations'
 *              401:
 *                  description: error in get Preparations
 */
 router.get('/', PreparationComponent.findAll)

 /**
  * @swagger
  *  /v1/Preparations/{id}:
  *      get:
  *          summary: get one Preparation by id
  *          tags: ["Preparations"]
  *          responses:
  *              200:
  *                  description: get Preparation succefully  
  *              401:
  *                  description: user not authorized to get Preparation
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Preparation,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', PreparationComponent.findOne);
 
 /**
  * @swagger
  *  /v1/Preparations/{id}:
  *      delete:
  *          summary: delete a Preparation
  *          tags: ["Preparations"]
  *          responses:
  *              200:
  *                  description: Preparation deleted succesfully
  *              401:
  *                  description: user not authorized to delete Preparations
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Preparation,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', PreparationComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/Preparations/{id}:
  *      put:
  *          summary: put Preparation in the DB
  *          tags: ["Preparations"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/Preparations'
  *          responses:
  *              200:
  *                  description: update Preparation successfully
  *              401:
  *                  description: user not authorized to update Preparations
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Preparation,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', PreparationComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/Preparations:
  *      post:
  *          summary: added a Preparation
  *          tags: ["Preparations"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Preparations'
  *          responses:
  *              200:
  *                  description: Preparation add successfully
  *              401:
  *                  description: user not authorized to add Preparations
  */
 router.post('/', PreparationComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: Preparations
  *  description: endpoints for managing api Preparations.
  * components:
  *  schemas:
  *      Preparations:
  *          type: object
  *          required:
  *              -name
  *          properties:
  *              id:
  *                  type: string
  *              name:
  *                  type: string,
  *              description:
  *                  type: string,
  *          example:
  *              name: preparation1
  *              description: preparation 1
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