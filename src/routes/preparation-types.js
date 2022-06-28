const { Router } = require('express');
const { PreparationTypeComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/PreparationTypes:
 *      get:
 *          summary: det all the PreparationTypes;
 *          tags: ["PreparationTypes"]
 *          responses:
 *              200:
 *                  description: get PreparationTypes successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/PreparationTypes'
 *              401:
 *                  description: error in get PreparationTypes
 */
 router.get('/', PreparationTypeComponent.findAll)

 /**
  * @swagger
  *  /v1/PreparationTypes/{id}:
  *      get:
  *          summary: get one PreparationTypes by id
  *          tags: ["PreparationTypes"]
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
 
 router.get('/:id', PreparationTypeComponent.findOne);
 
 /**
  * @swagger
  *  /v1/PreparationTypes/{id}:
  *      delete:
  *          summary: delete a PreparationTypes
  *          tags: ["PreparationTypes"]
  *          responses:
  *              200:
  *                  description: PreparationTypes deleted succesfully
  *              401:
  *                  description: user not authorized to delete PreparationTypes
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
 router.delete('/:id', PreparationTypeComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/PreparationTypes/{id}:
  *      put:
  *          summary: put PreparationTypes in the DB
  *          tags: ["PreparationTypes"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/PreparationTypes'
  *          responses:
  *              200:
  *                  description: update PreparationTypes successfully
  *              401:
  *                  description: user not authorized to update PreparationTypes
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
 
 router.put('/:id', PreparationTypeComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/PreparationTypes:
  *      post:
  *          summary: added a PreparationTypes
  *          tags: ["PreparationTypes"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/PreparationTypes'
  *          responses:
  *              200:
  *                  description: PreparationTypes add successfully
  *              401:
  *                  description: user not authorized to add PreparationTypes
  */
 router.post('/', PreparationTypeComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: PreparationTypes
  *  description: endpoints for managing api PreparationTypes.
  * components:
  *  schemas:
  *      PreparationTypes:
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