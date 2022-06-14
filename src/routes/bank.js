const { Router } = require('express');
const { BankComponent } = require('../components');

const bank = require('../components/bank');
const bankService = require('../components/bank/service');

const router = Router();


/**
 * @swagger
 *  /v1/banks:
 *      get:
 *          summary: det all the banks;
 *          tags: ["banks"]
 *          responses:
 *              200:
 *                  description: get banks successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/banks'
 *              401:
 *                  description: error in get banks
 */
router.get('/', BankComponent.findAll)

/**
 * @swagger
 *  /v1/banks/{id}:
 *      get:
 *          summary: get one bank by id
 *          tags: ["banks"]
 *          responses:
 *              200:
 *                  description: get bank succefully  
 *              401:
 *                  description: bank not authorized to get bank
 *          parameters: [
 *           {
 *              name: id,
 *              in: path,
 *              description: id of the bank,
 *              required: true,
 *              schema: {
 *                  type: string
 *              }
 *           },
 *          ]
 */

router.get('/:id', BankComponent.findOne);

/**
 * @swagger
 *  /v1/banks/{id}:
 *      delete:
 *          summary: delete a bank
 *          tags: ["banks"]
 *          responses:
 *              200:
 *                  description: bank deleted succesfully
 *              401:
 *                  description: bank not authorized to delete banks
 *          parameters: [
 *           {
 *              name: id,
 *              in: path,
 *              description: id of the bank,
 *              required: true,
 *              schema: {
 *                  type: string,
 *              }
 *           },
 *          ]
 */
router.delete('/:id', BankComponent.deleteOne);

/**
 * @swagger
 *  /v1/banks/{id}:
 *      put:
 *          summary: put bank in the DB
 *          tags: ["banks"]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                           $ref: '#/components/schemas/banks'
 *          responses:
 *              200:
 *                  description: update bank successfully
 *              401:
 *                  description: bank not authorized to update banks
 *          parameters: [
 *           {
 *              name: id,
 *              in: path,
 *              description: id of the bank,
 *              required: true,
 *              schema: {
 *                  type: string,
 *              }
 *           },
 *          ]
 */

router.put('/:id', BankComponent.updateOne);

/**
 * @swagger
 *  /v1/banks:
 *      post:
 *          summary: added a bank
 *          tags: ["banks"]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/banks'
 *          responses:
 *              200:
 *                  description: bank add successfully
 *              401:
 *                  descripion: bank not authorized to add banks
 */
router.post('/', BankComponent.create)


/**
 * @swagger
 * tags:
 *  name: banks
 *  description: endpoints for managing api banks.
 * components:
 *  schemas:
 *      banks:
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