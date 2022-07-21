const { Router } = require('express');
const { TaxesAndCostComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/TaxesAndCosts:
 *      get:
 *          summary: get all the TaxesAndCosts;
 *          tags: ["TaxesAndCosts"]
 *          responses:
 *              200:
 *                  description: get TaxesAndCosts successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/TaxesAndCosts'
 *              401:
 *                  description: error in get TaxesAndCosts
 */
 router.get('/', TaxesAndCostComponent.findAll)

 /**
  * @swagger
  *  /v1/TaxesAndCosts/{id}:
  *      get:
  *          summary: get one TaxesAndCost by id
  *          tags: ["TaxesAndCosts"]
  *          responses:
  *              200:
  *                  description: get TaxesAndCost succefully  
  *              401:
  *                  description: user not authorized to get TaxesAndCost
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the TaxesAndCost,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', TaxesAndCostComponent.findOne);
 
 /**
  * @swagger
  *  /v1/TaxesAndCosts/{id}:
  *      delete:
  *          summary: delete a TaxesAndCost
  *          tags: ["TaxesAndCosts"]
  *          responses:
  *              200:
  *                  description: TaxesAndCost deleted succesfully
  *              401:
  *                  description: user not authorized to delete TaxesAndCosts
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the TaxesAndCost,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', TaxesAndCostComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/TaxesAndCosts/{id}:
  *      put:
  *          summary: put TaxesAndCost in the DB
  *          tags: ["TaxesAndCosts"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/TaxesAndCosts'
  *          responses:
  *              200:
  *                  description: update TaxesAndCost successfully
  *              401:
  *                  description: user not authorized to update TaxesAndCosts
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the TaxesAndCost,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', TaxesAndCostComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/TaxesAndCosts:
  *      post:
  *          summary: added a TaxesAndCost
  *          tags: ["TaxesAndCosts"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/TaxesAndCosts'
  *          responses:
  *              200:
  *                  description: TaxesAndCost add successfully
  *              401:
  *                  description: user not authorized to add TaxesAndCosts
  */
 router.post('/', TaxesAndCostComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: TaxesAndCosts
  *  description: endpoints for managing api TaxesAndCosts.
  * components:
  *  schemas:
  *      TaxesAndCosts:
  *          type: object
  *          required:
  *              -ProductId
  *              -ShoppingTaxId
  *              -unitTaxCostId
  *              -valueIco
  *              -productCost
  *              -unitCost
  *          properties:
  *              id:
  *                  type: string
  *              ProductId:
  *                  type: string
  *              ShoppingTaxId:
  *                  type: string
  *              unitTaxCostId:
  *                  type: string
  *              applyIco:
  *                  type: boolean
  *              valueIco:
  *                  type: number
  *              includeIcoInCost:
  *                  type: boolean
  *              productCost:
  *                  type: number
  *              unitCost:
  *                  type: number
  *              isActive:
  *                  type: boolean
  *          example:
  *              ProductId: idproduct
  *              ShoppingTaxId: idTax
  *              unitTaxCostId: idTax
  *              applyIco: true
  *              valueIco: 2000
  *              includeIcoInCost: true 
  *              productCost: 300000
  *              unitCost: 30000
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