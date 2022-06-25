const { Router } = require('express');
const { UnitMeasurementComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/UnitMeasurements:
 *      get:
 *          summary: det all the UnitMeasurements;
 *          tags: ["UnitMeasurements"]
 *          responses:
 *              200:
 *                  description: get UnitMeasurements successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/UnitMeasurements'
 *              401:
 *                  description: error in get UnitMeasurements
 */
 router.get('/', UnitMeasurementComponent.findAll)

 /**
  * @swagger
  *  /v1/UnitMeasurements/{id}:
  *      get:
  *          summary: get one UnitMeasurement by id
  *          tags: ["UnitMeasurements"]
  *          responses:
  *              200:
  *                  description: get UnitMeasurement succefully  
  *              401:
  *                  description: user not authorized to get UnitMeasurement
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the UnitMeasurement,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', UnitMeasurementComponent.findOne);
 
 /**
  * @swagger
  *  /v1/UnitMeasurements/{id}:
  *      delete:
  *          summary: delete a UnitMeasurement
  *          tags: ["UnitMeasurements"]
  *          responses:
  *              200:
  *                  description: UnitMeasurement deleted succesfully
  *              401:
  *                  description: user not authorized to delete UnitMeasurements
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the UnitMeasurement,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', UnitMeasurementComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/UnitMeasurements/{id}:
  *      put:
  *          summary: put UnitMeasurement in the DB
  *          tags: ["UnitMeasurements"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/UnitMeasurements'
  *          responses:
  *              200:
  *                  description: update UnitMeasurement successfully
  *              401:
  *                  description: user not authorized to update UnitMeasurements
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the UnitMeasurement,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', UnitMeasurementComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/UnitMeasurements:
  *      post:
  *          summary: added a UnitMeasurement
  *          tags: ["UnitMeasurements"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/UnitMeasurements'
  *          responses:
  *              200:
  *                  description: UnitMeasurement add successfully
  *              401:
  *                  description: user not authorized to add UnitMeasurements
  */
 router.post('/', UnitMeasurementComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: UnitMeasurements
  *  description: endpoints for managing api UnitMeasurements.
  * components:
  *  schemas:
  *      UnitMeasurements:
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