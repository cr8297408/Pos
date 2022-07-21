const { Router } = require('express');
const { ProductCurveComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/ProductCurves:
 *      get:
 *          summary: get all the ProductCurves;
 *          tags: ["ProductCurves"]
 *          responses:
 *              200:
 *                  description: get ProductCurves successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/ProductCurves'
 *              401:
 *                  description: error in get ProductCurves
 */
 router.get('/', ProductCurveComponent.findAll)

 /**
  * @swagger
  *  /v1/ProductCurves/{id}:
  *      get:
  *          summary: get one ProductCurve by id
  *          tags: ["ProductCurves"]
  *          responses:
  *              200:
  *                  description: get ProductCurve succefully  
  *              401:
  *                  description: user not authorized to get ProductCurve
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductCurve,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', ProductCurveComponent.findOne);
 
 /**
  * @swagger
  *  /v1/ProductCurves/{id}:
  *      delete:
  *          summary: delete a ProductCurve
  *          tags: ["ProductCurves"]
  *          responses:
  *              200:
  *                  description: ProductCurve deleted succesfully
  *              401:
  *                  description: user not authorized to delete ProductCurves
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductCurve,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', ProductCurveComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/ProductCurves/{id}:
  *      put:
  *          summary: put ProductCurve in the DB
  *          tags: ["ProductCurves"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/ProductCurves'
  *          responses:
  *              200:
  *                  description: update ProductCurve successfully
  *              401:
  *                  description: user not authorized to update ProductCurves
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ProductCurve,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', ProductCurveComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/ProductCurves:
  *      post:
  *          summary: added a ProductCurve
  *          tags: ["ProductCurves"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/ProductCurves'
  *          responses:
  *              200:
  *                  description: ProductCurve add successfully
  *              401:
  *                  description: user not authorized to add ProductCurves
  */
 router.post('/', ProductCurveComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: ProductCurves
  *  description: endpoints for managing api ProductCurves.
  * components:
  *  schemas:
  *      ProductCurves:
  *          type: object
  *          required:
  *              -ProductId
  *              -name
  *          properties:
  *              id:
  *                  type: string
  *              ProductId:
  *                  type: string
  *              name:
  *                  type: string
  *              description:
  *                  type: string
  *              code:
  *                  type: string
  *              ref:
  *                  type: string
  *              isActive:
  *                  type: boolean
  *          example:
  *              ProductId: idproducto
  *              name: curvaproducto
  *              description: descripcion curva
  *              code: tr453y
  *              ref: hamb433
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