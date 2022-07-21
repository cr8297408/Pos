const { Router } = require('express');
const { ProductMenuComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/ProductMenus:
 *      get:
 *          summary: get all the ProductMenus;
 *          tags: ["ProductMenus"]
 *          responses:
 *              200:
 *                  description: get ProductMenus successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/ProductMenus'
 *              401:
 *                  description: error in get ProductMenus
 */
 router.get('/', ProductMenuComponent.findAll)

 /**
  * @swagger
  *  /v1/ProductMenus/{id}:
  *      get:
  *          summary: get one ProductMenu by id
  *          tags: ["ProductMenus"]
  *          responses:
  *              200:
  *                  description: get ProductMenu succefully  
  *              401:
  *                  description: user not authorized to get ProductMenu
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductMenu,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', ProductMenuComponent.findOne);
 
 /**
  * @swagger
  *  /v1/ProductMenus/{id}:
  *      delete:
  *          summary: delete a ProductMenu
  *          tags: ["ProductMenus"]
  *          responses:
  *              200:
  *                  description: ProductMenu deleted succesfully
  *              401:
  *                  description: user not authorized to delete ProductMenus
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductMenu,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', ProductMenuComponent.deleteOne);

  /**
  * @swagger
  *  /v1/ProductMenus/products/{id}:
  *      put:
  *          summary: added products to ProductMenu in the DB
  *          tags: ["ProductMenus"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/ProductsAdd'
  *          responses:
  *              200:
  *                  description: updated products successfully
  *              401:
  *                  description: user not authorized to update ProductMenus
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductMenu,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
   router.put('/products/:id', ProductMenuComponent.addProducts);

 /**
  * @swagger
  *  /v1/ProductMenus/{id}:
  *      put:
  *          summary: put ProductMenu in the DB
  *          tags: ["ProductMenus"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/ProductMenus'
  *          responses:
  *              200:
  *                  description: update ProductMenu successfully
  *              401:
  *                  description: user not authorized to update ProductMenus
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductMenu,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', ProductMenuComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/ProductMenus:
  *      post:
  *          summary: added a ProductMenu
  *          tags: ["ProductMenus"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/ProductMenus'
  *          responses:
  *              200:
  *                  description: ProductMenu add successfully
  *              401:
  *                  description: user not authorized to add ProductMenus
  */
 router.post('/', ProductMenuComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: ProductMenus
  *  description: endpoints for managing api ProductMenus.
  * components:
  *  schemas:
  *      ProductMenus:
  *          type: object
  *          required:
  *              -name
  *              -ProductId
  *          properties:
  *              id:
  *                  type: string
  *              name:
  *                  type: string
  *              ProductId:
  *                  type: string
  *              description:
  *                  type: string
  *              products:
  *                  type: array
  *          example:
  *              name: combo hamburguesa mas gaseosa
  *              ProductId: idproducto
  *              description: hamburguesa sencilla mas gaseosa personal
  *              products: {'hamburguesa': 'idHamburguesa', 'gaseosa': idGaseosa'}
  *      ProductsAdd:
  *          type: object
  *          required:
  *              -products
  *          properties:
  *              id:
  *                  type: string
  *              products:
  *                  type: array
  *          example:
  *              products: {'hamburguesa': 'idHamburguesa', 'gaseosa': idGaseosa'}
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