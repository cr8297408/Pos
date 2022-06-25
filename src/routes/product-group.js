const { Router } = require('express');
const { ProductGroupComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/ProductGroups:
 *      get:
 *          summary: det all the ProductGroups;
 *          tags: ["ProductGroups"]
 *          responses:
 *              200:
 *                  description: get ProductGroups successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/ProductGroups'
 *              401:
 *                  description: error in get ProductGroups
 */
 router.get('/', ProductGroupComponent.findAll)

 /**
  * @swagger
  *  /v1/ProductGroups/{id}:
  *      get:
  *          summary: get one ProductGroup by id
  *          tags: ["ProductGroups"]
  *          responses:
  *              200:
  *                  description: get ProductGroup succefully  
  *              401:
  *                  description: user not authorized to get ProductGroup
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductGroup,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', ProductGroupComponent.findOne);
 
 /**
  * @swagger
  *  /v1/ProductGroups/{id}:
  *      delete:
  *          summary: delete a ProductGroup
  *          tags: ["ProductGroups"]
  *          responses:
  *              200:
  *                  description: ProductGroup deleted succesfully
  *              401:
  *                  description: user not authorized to delete ProductGroups
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductGroup,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', ProductGroupComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/ProductGroups/{id}:
  *      put:
  *          summary: put ProductGroup in the DB
  *          tags: ["ProductGroups"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/ProductGroups'
  *          responses:
  *              200:
  *                  description: update ProductGroup successfully
  *              401:
  *                  description: user not authorized to update ProductGroups
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductGroup,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', ProductGroupComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/ProductGroups:
  *      post:
  *          summary: added a ProductGroup
  *          tags: ["ProductGroups"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/ProductGroups'
  *          responses:
  *              200:
  *                  description: ProductGroup add successfully
  *              401:
  *                  description: user not authorized to add ProductGroups
  */
 router.post('/', ProductGroupComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: ProductGroups
  *  description: endpoints for managing api ProductGroups.
  * components:
  *  schemas:
  *      ProductGroups:
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