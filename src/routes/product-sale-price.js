const { Router } = require('express');
const { ProductSalePriceComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/ProductSalePrices:
 *      get:
 *          summary: get all the ProductSalePrices;
 *          tags: ["ProductSalePrices"]
 *          responses:
 *              200:
 *                  description: get ProductSalePrices successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/ProductSalePrices'
 *              401:
 *                  description: error in get ProductSalePrices
 */
 router.get('/', ProductSalePriceComponent.findAll)

 /**
  * @swagger
  *  /v1/ProductSalePrices/{id}:
  *      get:
  *          summary: get one ProductSalePrice by id
  *          tags: ["ProductSalePrices"]
  *          responses:
  *              200:
  *                  description: get ProductSalePrice succefully  
  *              401:
  *                  description: user not authorized to get ProductSalePrice
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductSalePrice,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', ProductSalePriceComponent.findOne);
 
 /**
  * @swagger
  *  /v1/ProductSalePrices/{id}:
  *      delete:
  *          summary: delete a ProductSalePrice
  *          tags: ["ProductSalePrices"]
  *          responses:
  *              200:
  *                  description: ProductSalePrice deleted succesfully
  *              401:
  *                  description: user not authorized to delete ProductSalePrices
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductSalePrice,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', ProductSalePriceComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/ProductSalePrices/{id}:
  *      put:
  *          summary: put ProductSalePrice in the DB
  *          tags: ["ProductSalePrices"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/ProductSalePrices'
  *          responses:
  *              200:
  *                  description: update ProductSalePrice successfully
  *              401:
  *                  description: user not authorized to update ProductSalePrices
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductSalePrice,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', ProductSalePriceComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/ProductSalePrices:
  *      post:
  *          summary: added a ProductSalePrice
  *          tags: ["ProductSalePrices"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/ProductSalePrices'
  *          responses:
  *              200:
  *                  description: ProductSalePrice add successfully
  *              401:
  *                  description: user not authorized to add ProductSalePrices
  */
 router.post('/', ProductSalePriceComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: ProductSalePrices
  *  description: endpoints for managing api ProductSalePrices.
  * components:
  *  schemas:
  *      ProductSalePrices:
  *          type: object
  *          required:
  *              -ProductId
  *              -GeneralValueTaxId
  *          properties:
  *              id:
  *                  type: string
  *              generalValue: 
  *                  type: number
  *              generalUtilityValue:
  *                  type: number
  *              comission:
  *                  type: number
  *              specialOneValue:
  *                  type: number
  *              specialTwoValue:
  *                  type: number
  *              specialTwoUtilityValue:
  *                  type: number
  *              ProductId:
  *                  type: string
  *              GeneralValueTaxId:
  *                  type: string
  *              SpecialOneValueTaxId:
  *                  type: string
  *              SpecialTwoValueTaxId:
  *                  type: string
  *          example:
  *              ProductId: idProduct
  *              GeneralValueTaxId: idTax
  *              SpecialOneValueTaxId: idTax
  *              SpecialTwoValueTaxId: idTa
  *              generalValue: 30000
  *              generalUtilityValue: 33000
  *              comission: 3000
  *              specialOneValue: 27000
  *              specialTwoValue: 25000
  *              specialTwoUtilityValue: 32000
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