const { Router } = require('express');
const { FiscalResponsibilityComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/FiscalResponsibilitys:
 *      get:
 *          summary: get all the FiscalResponsibilitys;
 *          tags: ["FiscalResponsibilitys"]
 *          responses:
 *              200:
 *                  description: get FiscalResponsibilitys successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/FiscalResponsibilitys'
 *              401:
 *                  description: error in get FiscalResponsibilitys
 */
 router.get('/', FiscalResponsibilityComponent.findAll)

 /**
  * @swagger
  *  /v1/FiscalResponsibilitys/{id}:
  *      get:
  *          summary: get one FiscalResponsibility by id
  *          tags: ["FiscalResponsibilitys"]
  *          responses:
  *              200:
  *                  description: get FiscalResponsibility succefully  
  *              401:
  *                  description: user not authorized to get FiscalResponsibility
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the FiscalResponsibility,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', FiscalResponsibilityComponent.findOne);
 
 /**
  * @swagger
  *  /v1/FiscalResponsibilitys/{id}:
  *      delete:
  *          summary: delete a FiscalResponsibility
  *          tags: ["FiscalResponsibilitys"]
  *          responses:
  *              200:
  *                  description: FiscalResponsibility deleted succesfully
  *              401:
  *                  description: user not authorized to delete FiscalResponsibilitys
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the FiscalResponsibility,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', FiscalResponsibilityComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/FiscalResponsibilitys/{id}:
  *      put:
  *          summary: put FiscalResponsibility in the DB
  *          tags: ["FiscalResponsibilitys"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/FiscalResponsibilitys'
  *          responses:
  *              200:
  *                  description: update FiscalResponsibility successfully
  *              401:
  *                  description: user not authorized to update FiscalResponsibilitys
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the FiscalResponsibility,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', FiscalResponsibilityComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/FiscalResponsibilitys:
  *      post:
  *          summary: added a FiscalResponsibility
  *          tags: ["FiscalResponsibilitys"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/FiscalResponsibilitys'
  *          responses:
  *              200:
  *                  description: FiscalResponsibility add successfully
  *              401:
  *                  description: user not authorized to add FiscalResponsibilitys
  */
 router.post('/', FiscalResponsibilityComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: FiscalResponsibilitys
  *  description: endpoints for managing api FiscalResponsibilitys.
  * components:
  *  schemas:
  *      FiscalResponsibilitys:
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