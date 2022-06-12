const { Router } = require('express');
const { BillingResolutionComponent } = require('../components');

const BillingResolution = require('../components/Billing-resolution');
const BillingResolutionService = require('../components/Billing-resolution/service');

const router = Router();

/**
 * @swagger
 *  /v1/billingResolutions:
 *      get:
 *          summary: det all the billingResolutions;
 *          tags: ["billingResolutions"]
 *          responses:
 *              200:
 *                  description: get billingResolutions successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/billingResolutions'
 *              401:
 *                  description: error in get billingResolutions
 */
 router.get('/', BillingResolutionComponent.findAll)

 /**
  * @swagger
  *  /v1/billingResolutions/{id}:
  *      get:
  *          summary: get one billingResolution by id
  *          tags: ["billingResolutions"]
  *          responses:
  *              200:
  *                  description: get billingResolution succefully  
  *              401:
  *                  description: user not authorized to get billingResolution
  *          parameters: [
  *           {
  *              name: idProducto,
  *              in: path,
  *              description: id con el que está registrado en el sistema el producto a eliminar,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', BillingResolutionComponent.findOne);
 
 /**
  * @swagger
  *  /v1/billingResolutions/{id}:
  *      delete:
  *          summary: delete a billingResolution
  *          tags: ["billingResolutions"]
  *          responses:
  *              200:
  *                  description: billingResolution deleted succesfully
  *              401:
  *                  description: user not authorized to delete billingResolutions
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the billingResolution,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', BillingResolutionComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/billingResolutions/{id}:
  *      put:
  *          summary: put billingResolution in the DB
  *          tags: ["billingResolutions"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/billingResolutions'
  *          responses:
  *              200:
  *                  description: update billingResolution successfully
  *              401:
  *                  description: user not authorized to update billingResolutions
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the billingResolution,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', BillingResolutionComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/billingResolutions:
  *      post:
  *          summary: added a billingResolution
  *          tags: ["billingResolutions"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/billingResolutions'
  *          responses:
  *              200:
  *                  description: billingResolution add successfully
  *              401:
  *                  descripion: user not authorized to add billingResolutions
  */
 router.post('/', BillingResolutionComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: billingResolutions
  *  description: endpoints for managing api billingResolutions.
  * components:
  *  schemas:
  *      billingResolutions:
  *          type: object
  *          required:
  *              -name
  *              -accountingAccount
  *          properties:
  *              id:
  *                  type: string
  *              name:
  *                  type: string,
  *              accountingAccount:
  *                    type: string
  *          example:
  *             resolutionClass: class prueba
  *             resolutionType: type prueba
  *             resolutionNumber: 1234
  *             prefix: res
  *             initialNumber: 2
  *             finalNumber: 3
  *             localBilling: false
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