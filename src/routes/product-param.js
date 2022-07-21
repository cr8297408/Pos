const { Router } = require('express');
const { ProductParamComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/ProductParams:
 *      get:
 *          summary: get all the ProductParams;
 *          tags: ["ProductParams"]
 *          responses:
 *              200:
 *                  description: get ProductParams successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/ProductParams'
 *              401:
 *                  description: error in get ProductParams
 */
 router.get('/', ProductParamComponent.findAll)

 /**
  * @swagger
  *  /v1/ProductParams/{id}:
  *      get:
  *          summary: get one ProductParam by id
  *          tags: ["ProductParams"]
  *          responses:
  *              200:
  *                  description: get ProductParam succefully  
  *              401:
  *                  description: user not authorized to get ProductParam
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductParam,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', ProductParamComponent.findOne);
 
 /**
  * @swagger
  *  /v1/ProductParams/{id}:
  *      delete:
  *          summary: delete a ProductParam
  *          tags: ["ProductParams"]
  *          responses:
  *              200:
  *                  description: ProductParam deleted succesfully
  *              401:
  *                  description: user not authorized to delete ProductParams
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductParam,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', ProductParamComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/ProductParams/{id}:
  *      put:
  *          summary: put ProductParam in the DB
  *          tags: ["ProductParams"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/ProductParams'
  *          responses:
  *              200:
  *                  description: update ProductParam successfully
  *              401:
  *                  description: user not authorized to update ProductParams
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductParam,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', ProductParamComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/ProductParams:
  *      post:
  *          summary: added a ProductParam
  *          tags: ["ProductParams"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/ProductParams'
  *          responses:
  *              200:
  *                  description: ProductParam add successfully
  *              401:
  *                  description: user not authorized to add ProductParams
  */
 router.post('/', ProductParamComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: ProductParams
  *  description: endpoints for managing api ProductParams.
  * components:
  *  schemas:
  *      ProductParams:
  *          type: object
  *          required:
  *              -ProductId
  *          properties:
  *              id:
  *                  type: string
  *              ProductId:
  *                  type: string
  *              WarehouseId: 
  *                  type: string
  *              ProductMenuId: 
  *                  type: string
  *              PreparationTypeId: 
  *                  type: string
  *              updatePriceInInvoice: 
  *                  type: boolean
  *              belongsToWarehouse: 
  *                  type: boolean
  *              releaseToMenu: 
  *                  type: boolean
  *              invoicePriceRangeFrom: 
  *                  type: number
  *              invoicePriceRangeTO: 
  *                  type: number
  *              maxDiscount: 
  *                  type: number
  *              maxStock: 
  *                  type: number
  *              minStock: 
  *                  type: number
  *              replenishIn: 
  *                  type: string
  *              additional: 
  *                  type: string
  *              unitPoints: 
  *                  type: string
  *              attentionTimeServiceOrders: 
  *                  type: string
  *              calculatePriceInvoicePercetage: 
  *                  type: string
  *              pointsPerUnit: 
  *                  type: string
  *              gourmetQualify: 
  *                  type: object
  *              options: 
  *                  type: object
  *              productWithPreparation: 
  *                  type: boolean
  *              inventoryAccount: 
  *                  type: string
  *              salesAccount: 
  *                  type: string
  *              costSaleAccount: 
  *                  type: string
  *              fixedAsset: 
  *                  type: boolean
  *              isActive: 
  *                  type: boolean
  *          example:
  *              ProductId: idproducto
  *              WarehouseId: idwarehouse
  *              ProductMenuId: idmenu
  *              PreparationTypeId: idpreparationtype
  *              updatePriceInInvoice: true
  *              belongsToWarehouse: true
  *              releaseToMenu: true
  *              invoicePriceRangeFrom: 20000 
  *              invoicePriceRangeTO: 30000
  *              maxDiscount: 1000
  *              maxStock: 1000
  *              minStock: 200
  *              replenishIn: tienda
  *              additional: addAditional
  *              unitPoints: string
  *              attentionTimeServiceOrders: "attentionTimeServiceOrders"
  *              calculatePriceInvoicePercetage: "20" 
  *              pointsPerUnit: "20 points"
  *              gourmetQualify: { "qualifity1": "5 stars", "qualifity2": "4 stars"}
  *              options: { "option1": "option1", "option2": "option2" }
  *              productWithPreparation: true 
  *              inventoryAccount: account1
  *              salesAccount: account2
  *              costSaleAccount: account3
  *              fixedAsset: true
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