const { Router } = require('express');
const { PriceByVolumeComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/PriceByVolumes:
 *      get:
 *          summary: get all the PriceByVolumes;
 *          tags: ["PriceByVolumes"]
 *          responses:
 *              200:
 *                  description: get PriceByVolumes successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/PriceByVolumes'
 *              401:
 *                  description: error in get PriceByVolumes
 */
 router.get('/', PriceByVolumeComponent.findAll)

 /**
  * @swagger
  *  /v1/PriceByVolumes/{id}:
  *      get:
  *          summary: get one PriceByVolume by id
  *          tags: ["PriceByVolumes"]
  *          responses:
  *              200:
  *                  description: get PriceByVolume succefully  
  *              401:
  *                  description: user not authorized to get PriceByVolume
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the PriceByVolume,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', PriceByVolumeComponent.findOne);
 
 /**
  * @swagger
  *  /v1/PriceByVolumes/{id}:
  *      delete:
  *          summary: delete a PriceByVolume
  *          tags: ["PriceByVolumes"]
  *          responses:
  *              200:
  *                  description: PriceByVolume deleted succesfully
  *              401:
  *                  description: user not authorized to delete PriceByVolumes
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the PriceByVolume,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', PriceByVolumeComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/PriceByVolumes/{id}:
  *      put:
  *          summary: put PriceByVolume in the DB
  *          tags: ["PriceByVolumes"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/PriceByVolumes'
  *          responses:
  *              200:
  *                  description: update PriceByVolume successfully
  *              401:
  *                  description: user not authorized to update PriceByVolumes
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the PriceByVolume,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', PriceByVolumeComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/PriceByVolumes:
  *      post:
  *          summary: added a PriceByVolume
  *          tags: ["PriceByVolumes"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/PriceByVolumes'
  *          responses:
  *              200:
  *                  description: PriceByVolume add successfully
  *              401:
  *                  description: user not authorized to add PriceByVolumes
  */
 router.post('/', PriceByVolumeComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: PriceByVolumes
  *  description: endpoints for managing api PriceByVolumes.
  * components:
  *  schemas:
  *      PriceByVolumes:
  *          type: object
  *          required:
  *              -ProducId
  *              -name
  *          properties:
  *              id:
  *                  type: string
  *              ProductId:
  *                  type: string
  *              name:
  *                  type: string
  *              TaxId: 
  *                  type: string
  *              utility: 
  *                  type: number
  *              value: 
  *                  type: number
  *              quantity: 
  *                  type: number
  *          example:
  *              name: promo 10 hamburguesas
  *              ProducId: id producto
  *              TaxId: id impuesto
  *              utility: 10
  *              value: 30000
  *              quantity: 100
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