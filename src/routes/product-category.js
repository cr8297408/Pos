const { Router } = require('express');
const { ProductCategoryComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/ProductCategorys:
 *      get:
 *          summary: det all the ProductCategorys;
 *          tags: ["ProductCategorys"]
 *          responses:
 *              200:
 *                  description: get ProductCategorys successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/ProductCategorys'
 *              401:
 *                  description: error in get ProductCategorys
 */
 router.get('/', ProductCategoryComponent.findAll)

 /**
  * @swagger
  *  /v1/ProductCategorys/{id}:
  *      get:
  *          summary: get one ProductCategory by id
  *          tags: ["ProductCategorys"]
  *          responses:
  *              200:
  *                  description: get ProductCategory succefully  
  *              401:
  *                  description: user not authorized to get ProductCategory
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductCategory,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', ProductCategoryComponent.findOne);
 
 /**
  * @swagger
  *  /v1/ProductCategorys/{id}:
  *      delete:
  *          summary: delete a ProductCategory
  *          tags: ["ProductCategorys"]
  *          responses:
  *              200:
  *                  description: ProductCategory deleted succesfully
  *              401:
  *                  description: user not authorized to delete ProductCategorys
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductCategory,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', ProductCategoryComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/ProductCategorys/{id}:
  *      put:
  *          summary: put ProductCategory in the DB
  *          tags: ["ProductCategorys"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/ProductCategorys'
  *          responses:
  *              200:
  *                  description: update ProductCategory successfully
  *              401:
  *                  description: user not authorized to update ProductCategorys
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductCategory,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', ProductCategoryComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/ProductCategorys:
  *      post:
  *          summary: added a ProductCategory
  *          tags: ["ProductCategorys"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/ProductCategorys'
  *          responses:
  *              200:
  *                  description: ProductCategory add successfully
  *              401:
  *                  description: user not authorized to add ProductCategorys
  */
 router.post('/', ProductCategoryComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: ProductCategorys
  *  description: endpoints for managing api ProductCategorys.
  * components:
  *  schemas:
  *      ProductCategorys:
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
  *              name: deportes
  *              description: categoria de deportes
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