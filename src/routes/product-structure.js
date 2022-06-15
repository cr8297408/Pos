const { Router } = require('express');
const { ProductStructureComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/ProductStructures:
 *      get:
 *          summary: det all the ProductStructures;
 *          tags: ["ProductStructures"]
 *          responses:
 *              200:
 *                  description: get ProductStructures successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/ProductStructures'
 *              401:
 *                  description: error in get ProductStructures
 */
 router.get('/', ProductStructureComponent.findAll)

 /**
  * @swagger
  *  /v1/ProductStructures/{id}:
  *      get:
  *          summary: get one ProductStructure by id
  *          tags: ["ProductStructures"]
  *          responses:
  *              200:
  *                  description: get ProductStructure succefully  
  *              401:
  *                  description: user not authorized to get ProductStructure
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductStructure,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', ProductStructureComponent.findOne);
 
 /**
  * @swagger
  *  /v1/ProductStructures/{id}:
  *      delete:
  *          summary: delete a ProductStructure
  *          tags: ["ProductStructures"]
  *          responses:
  *              200:
  *                  description: ProductStructure deleted succesfully
  *              401:
  *                  description: user not authorized to delete ProductStructures
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductStructure,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', ProductStructureComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/ProductStructures/{id}:
  *      put:
  *          summary: put ProductStructure in the DB
  *          tags: ["ProductStructures"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/ProductStructures'
  *          responses:
  *              200:
  *                  description: update ProductStructure successfully
  *              401:
  *                  description: user not authorized to update ProductStructures
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductStructure,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', ProductStructureComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/ProductStructures:
  *      post:
  *          summary: added a ProductStructure
  *          tags: ["ProductStructures"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/ProductStructures'
  *          responses:
  *              200:
  *                  description: ProductStructure add successfully
  *              401:
  *                  description: user not authorized to add ProductStructures
  */
 router.post('/', ProductStructureComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: ProductStructures
  *  description: endpoints for managing api ProductStructures.
  * components:
  *  schemas:
  *      ProductStructures:
  *          type: object
  *          required:
  *              -name
  *              -code
  *          properties:
  *              id:
  *                  type: string
  *              name:
  *                  type: string,
  *              code:
  *                  type: string,
  *          example:
  *              name: product structure prueba
  *              code: codigoprueba
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