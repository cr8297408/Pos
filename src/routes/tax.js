const { Router } = require('express');
const { TaxComponent } = require('../components');

const Tax = require('./tax');
const TaxService = require('../components/Tax/service');

const router = Router();


/**
 * @swagger
 *  /v1/taxes:
 *      get:
 *          summary: det all the taxes;
 *          tags: ["taxes"]
 *          responses:
 *              200:
 *                  description: get taxes successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/taxes'
 *              401:
 *                  description: error in get taxes
 */
 router.get('/', TaxComponent.findAll)

 /**
  * @swagger
  *  /v1/taxes/{id}:
  *      get:
  *          summary: get one taxe by id
  *          tags: ["taxes"]
  *          responses:
  *              200:
  *                  description: get taxe succefully  
  *              401:
  *                  description: user not authorized to get taxe
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id tax,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id',TaxComponent.findOne);
 
 /**
  * @swagger
  *  /v1/taxes/{id}:
  *      delete:
  *          summary: delete a taxe
  *          tags: ["taxes"]
  *          responses:
  *              200:
  *                  description: taxe deleted succesfully
  *              401:
  *                  description: user not authorized to delete taxes
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the taxe,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', TaxComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/taxes/{id}:
  *      put:
  *          summary: put taxe in the DB
  *          tags: ["taxes"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/taxes'
  *          responses:
  *              200:
  *                  description: update taxe successfully
  *              401:
  *                  description: user not authorized to update taxes
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the taxe,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', TaxComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/taxes:
  *      post:
  *          summary: added a taxe
  *          tags: ["taxes"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/taxes'
  *          responses:
  *              200:
  *                  description: taxe add successfully
  *              401:
  *                  descripion: user not authorized to add taxes
  */
 router.post('/', TaxComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: taxes
  *  description: endpoints for managing api taxes.
  * components:
  *  schemas:
  *      taxes:
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
  *              name: bancolombia
  *              accountingAccount: 123
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