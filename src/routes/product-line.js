const { Router } = require('express');
const { ProductLineComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/productLines:
 *      get:
 *          summary: det all the ProductLines;
 *          tags: ["ProductLines"]
 *          responses:
 *              200:
 *                  description: get ProductLines successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/ProductLines'
 *              401:
 *                  description: error in get ProductLines
 */
 router.get('/', ProductLineComponent.findAll)

 /**
  * @swagger
  *  /v1/productLines/{id}:
  *      get:
  *          summary: get one ProductLine by id
  *          tags: ["ProductLines"]
  *          responses:
  *              200:
  *                  description: get ProductLine succefully  
  *              401:
  *                  description: user not authorized to get ProductLine
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductLine,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', ProductLineComponent.findOne);
 
 /**
  * @swagger
  *  /v1/productLines/{id}:
  *      delete:
  *          summary: delete a ProductLine
  *          tags: ["ProductLines"]
  *          responses:
  *              200:
  *                  description: ProductLine deleted succesfully
  *              401:
  *                  description: user not authorized to delete ProductLines
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductLine,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', ProductLineComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/productLines/{id}:
  *      put:
  *          summary: put ProductLine in the DB
  *          tags: ["ProductLines"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/ProductLines'
  *          responses:
  *              200:
  *                  description: update ProductLine successfully
  *              401:
  *                  description: user not authorized to update ProductLines
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductLine,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', ProductLineComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/productLines:
  *      post:
  *          summary: added a ProductLine
  *          tags: ["ProductLines"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/ProductLines'
  *          responses:
  *              200:
  *                  description: ProductLine add successfully
  *              401:
  *                  description: user not authorized to add ProductLines
  */
 router.post('/', ProductLineComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: ProductLines
  *  description: endpoints for managing api ProductLines.
  * components:
  *  schemas:
  *      ProductLines:
  *          type: object
  *          required:
  *              -name
  *          properties:
  *              id:
  *                  type: string
  *              name:
  *                  type: string,
  *              code:
  *                  type: string,
  *              ProductStructureId:
  *                  type: string,
  *          example:
  *              name: product line prueba
  *              code: codigopruebaline
  *              ProductStructureId: 6efb1a83-1dc9-41b6-acd5-3d248266b1ee
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