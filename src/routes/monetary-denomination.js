const { Router } = require('express');
const { MonetaryDenominationComponent } = require('../components');

const MonetaryDenomination = require('../components/monetary-denomination');
const MonetaryDenominationService = require('../components/monetary-denomination/service');

const router = Router();


/**
 * @swagger
 *  /v1/monetaryDenominations:
 *      get:
 *          summary: det all the monetaryDenominations;
 *          tags: ["monetaryDenominations"]
 *          responses:
 *              200:
 *                  description: get monetaryDenominations successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/monetaryDenominations'
 *              401:
 *                  description: error in get monetaryDenominations
 */
 router.get('/', MonetaryDenominationComponent.findAll)

 /**
  * @swagger
  *  /v1/monetaryDenominations/{id}:
  *      get:
  *          summary: get one monetaryDenomination by id
  *          tags: ["monetaryDenominations"]
  *          responses:
  *              200:
  *                  description: get monetaryDenomination succefully  
  *              401:
  *                  description: user not authorized to get monetaryDenomination
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id monetary Denominations,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', MonetaryDenominationComponent.findOne);
 
 /**
  * @swagger
  *  /v1/monetaryDenominations/{id}:
  *      delete:
  *          summary: delete a monetaryDenomination
  *          tags: ["monetaryDenominations"]
  *          responses:
  *              200:
  *                  description: monetaryDenomination deleted succesfully
  *              401:
  *                  description: user not authorized to delete monetaryDenominations
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the monetaryDenomination,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', MonetaryDenominationComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/monetaryDenominations/{id}:
  *      put:
  *          summary: put monetaryDenomination in the DB
  *          tags: ["monetaryDenominations"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/monetaryDenominations'
  *          responses:
  *              200:
  *                  description: update monetaryDenomination successfully
  *              401:
  *                  description: user not authorized to update monetaryDenominations
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the monetaryDenomination,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', MonetaryDenominationComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/monetaryDenominations:
  *      post:
  *          summary: added a monetaryDenomination
  *          tags: ["monetaryDenominations"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/monetaryDenominations'
  *          responses:
  *              200:
  *                  description: monetaryDenomination add successfully
  *              401:
  *                  descripion: user not authorized to add monetaryDenominations
  */
 router.post('/', MonetaryDenominationComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: monetaryDenominations
  *  description: endpoints for managing api monetaryDenominations.
  * components:
  *  schemas:
  *      monetaryDenominations:
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
  *              photoFile: idphototprueba
  *              value: 2000
  *              monetaryDenominationTypes: COIN
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