const { Router } = require('express');
const { MeasureUnitComponent } = require('../components');

const MeasureUnit = require('../components/measure-unit');
const MeasureUnitService = require('../components/measure-unit/service');

const router = Router();

/**
 * @swagger
 *  /v1/measureUnits:
 *      get:
 *          summary: det all the measureUnits;
 *          tags: ["measureUnits"]
 *          responses:
 *              200:
 *                  description: get measureUnits successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/measureUnits'
 *              401:
 *                  description: error in get measureUnits
 */
 router.get('/', MeasureUnitComponent.findAll)

 /**
  * @swagger
  *  /v1/measureUnits/{id}:
  *      get:
  *          summary: get one measureUnit by id
  *          tags: ["measureUnits"]
  *          responses:
  *              200:
  *                  description: get measureUnit succefully  
  *              401:
  *                  description: user not authorized to get measureUnit
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
 
 router.get('/:id', MeasureUnitComponent.findOne);
 
 /**
  * @swagger
  *  /v1/measureUnits/{id}:
  *      delete:
  *          summary: delete a measureUnit
  *          tags: ["measureUnits"]
  *          responses:
  *              200:
  *                  description: measureUnit deleted succesfully
  *              401:
  *                  description: user not authorized to delete measureUnits
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the measureUnit,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', MeasureUnitComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/measureUnits/{id}:
  *      put:
  *          summary: put measureUnit in the DB
  *          tags: ["measureUnits"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/measureUnits'
  *          responses:
  *              200:
  *                  description: update measureUnit successfully
  *              401:
  *                  description: user not authorized to update measureUnits
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the measureUnit,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', MeasureUnitComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/measureUnits:
  *      post:
  *          summary: added a measureUnit
  *          tags: ["measureUnits"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/measureUnits'
  *          responses:
  *              200:
  *                  description: measureUnit add successfully
  *              401:
  *                  descripion: user not authorized to add measureUnits
  */
 router.post('/', MeasureUnitComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: measureUnits
  *  description: endpoints for managing api measureUnits.
  * components:
  *  schemas:
  *      measureUnits:
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