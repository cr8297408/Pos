const { Router } = require('express');
const { PreparationTypesComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/PreparationTypess:
 *      get:
 *          summary: det all the PreparationTypess;
 *          tags: ["PreparationTypess"]
 *          responses:
 *              200:
 *                  description: get PreparationTypess successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/PreparationTypess'
 *              401:
 *                  description: error in get PreparationTypess
 */
 router.get('/', PreparationTypesComponent.findAll)

 /**
  * @swagger
  *  /v1/PreparationTypess/{id}:
  *      get:
  *          summary: get one PreparationTypes by id
  *          tags: ["PreparationTypess"]
  *          responses:
  *              200:
  *                  description: get PreparationTypes succefully  
  *              401:
  *                  description: user not authorized to get PreparationTypes
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the PreparationTypes,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', PreparationTypesComponent.findOne);
 
 /**
  * @swagger
  *  /v1/PreparationTypess/{id}:
  *      delete:
  *          summary: delete a PreparationTypes
  *          tags: ["PreparationTypess"]
  *          responses:
  *              200:
  *                  description: PreparationTypes deleted succesfully
  *              401:
  *                  description: user not authorized to delete PreparationTypess
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the PreparationTypes,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', PreparationTypesComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/PreparationTypess/{id}:
  *      put:
  *          summary: put PreparationTypes in the DB
  *          tags: ["PreparationTypess"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/PreparationTypess'
  *          responses:
  *              200:
  *                  description: update PreparationTypes successfully
  *              401:
  *                  description: user not authorized to update PreparationTypess
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the PreparationTypes,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', PreparationTypesComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/PreparationTypess:
  *      post:
  *          summary: added a PreparationTypes
  *          tags: ["PreparationTypess"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/PreparationTypess'
  *          responses:
  *              200:
  *                  description: PreparationTypes add successfully
  *              401:
  *                  description: user not authorized to add PreparationTypess
  */
 router.post('/', PreparationTypesComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: PreparationTypess
  *  description: endpoints for managing api PreparationTypess.
  * components:
  *  schemas:
  *      PreparationTypess:
  *          type: object
  *          required:
  *              -name
  *          properties:
  *              id:
  *                  type: string
  *              name:
  *                  type: string,
  *          example:
  *              name: unit prueba
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