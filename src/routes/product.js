const { Router } = require('express');
const { ProductComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/Products:
 *      get:
 *          summary: get all the Products;
 *          tags: ["Products"]
 *          responses:
 *              200:
 *                  description: get Products successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Products'
 *              401:
 *                  description: error in get Products
 */
 router.get('/', ProductComponent.findAll)

 /**
  * @swagger
  *  /v1/Products/{id}:
  *      get:
  *          summary: get one Product by id
  *          tags: ["Products"]
  *          responses:
  *              200:
  *                  description: get Product succefully  
  *              401:
  *                  description: user not authorized to get Product
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Product,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', ProductComponent.findOne);
 
 /**
  * @swagger
  *  /v1/Products/{id}:
  *      delete:
  *          summary: delete a Product
  *          tags: ["Products"]
  *          responses:
  *              200:
  *                  description: Product deleted succesfully
  *              401:
  *                  description: user not authorized to delete Products
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Product,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', ProductComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/Products/{id}:
  *      put:
  *          summary: put Product in the DB
  *          tags: ["Products"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/Products'
  *          responses:
  *              200:
  *                  description: update Product successfully
  *              401:
  *                  description: user not authorized to update Products
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Product,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', ProductComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/Products:
  *      post:
  *          summary: added a Product, it is necessary to have created at least one line and one structure
  *          tags: ["Products"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Products'
  *          responses:
  *              200:
  *                  description: Product add successfully
  *              401:
  *                  description: user not authorized to add Products
  */
 router.post('/', ProductComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: Products
  *  description: endpoints for managing api Products.
  * components:
  *  schemas:
  *      Products:
  *          type: object
  *          required:
  *              -name
  *              -code
  *              -ProductStructureId
  *              -ProductLineId
  *          properties:
  *              id:
  *                  type: string
  *              name:
  *                  type: string
  *              description:
  *                  type: string
  *              code:
  *                  type: string
  *              ref:
  *                  type: string
  *              subGroups:
  *                  type: string
  *              barCode:
  *                  type: string
  *              barCodeGroup:
  *                  type: string
  *              ProductStructureId:
  *                  type: string
  *              ProductLineId:
  *                  type: string
  *              UnitMeasurementId:
  *                  type: string
  *              ProductAreaId:
  *                  type: string
  *              ProductGroupId:
  *                  type: string
  *              FileId:
  *                  type: string
  *              shoppingAssistant:
  *                  type: boolean
  *              isProductCurve:
  *                  type: boolean
  *              compound:
  *                  type: boolean
  *              isActive:
  *                  type: boolean
  *          example:
  *              name: Hamburguesa sencilla
  *              description: hamburguesa con una carne, cebolla tomate y queso
  *              code: 123
  *              ref: 
  *              subGroups:  
  *              barCode: yuqyeqyeyy3
  *              barCodeGroup: 
  *              ProductStructureId: idproductStructure
  *              ProductLineId: idproductline
  *              UnitMeasurementId: idunitmeasurement
  *              ProductAreaId: idproductarea
  *              ProductGroupId: idproductgroup
  *              FileId: idfile
  *              shoppingAssistant: true 
  *              isProductCurve: true
  *              compound: true
  *              isActive: true
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