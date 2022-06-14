const { Router } = require('express');
const { 
  UserComponent, 
  BankComponent, 
  BillingResolutionComponent, 
  MeasureUnitComponent,
  MonetaryDenominationComponent
} = require('../components');


const router = Router();

/**
  * @swagger
  *  /v1/page/users?:
  *      post:
  *          summary: get users paginated
  *          tags: ["pagination"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/user'
  *          responses:
  *              200:
  *                  description: get user succefully  
  *              401:
  *                  description: user not authorized to get user
  *          parameters: [
  *           {
  *              name: size,
  *              in: query,
  *              description: size to pagination,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *           {
  *              name: page,
  *              in: query,
  *              description: number of page paginate,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 router.post('/users/?', UserComponent.findpagination);


 /**
  * @swagger
  *  /v1/page/banks?:
  *      post:
  *          summary: get one bank by id
  *          tags: ["pagination"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/bank'
  *          responses:
  *              200:
  *                  description: get bank succefully  
  *              401:
  *                  description: bank not authorized to get bank
  *          parameters: [
  *           {
  *              name: size,
  *              in: query,
  *              description: size to pagination,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *           {
  *              name: page,
  *              in: query,
  *              description: number of page paginate,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
  router.post('/banks/?', BankComponent.findpagination);

/**
  * @swagger
  *  /v1/page/billingResolutions?:
  *      post:
  *          summary: get billingResolutions paginated
  *          tags: ["pagination"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/billing'
  *          responses:
  *              200:
  *                  description: get billingResolution succefully  
  *              401:
  *                  description: billingResolution not authorized to get billingResolution
  *          parameters: [
  *           {
  *              name: size,
  *              in: query,
  *              description: size to pagination,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *           {
  *              name: page,
  *              in: query,
  *              description: number of page paginate,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
router.post('/billingResolutions/?', BillingResolutionComponent.findpagination);

/**
  * @swagger
  *  /v1/page/measureUnit?:
  *      get:
  *          summary: get MeasureUnits paginated
  *          tags: ["pagination"]
  *          responses:
  *              200:
  *                  description: get MeasureUnit succefully  
  *              401:
  *                  description: MeasureUnit not authorized to get MeasureUnit
  *          parameters: [
  *           {
  *              name: size,
  *              in: query,
  *              description: size to pagination,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *           {
  *              name: page,
  *              in: query,
  *              description: number of page paginate,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 router.get('/measureUnit/?', MeasureUnitComponent.findpagination);

 /**
  * @swagger
  *  /v1/page/monetaryDenominations?:
  *      post:
  *          summary: get monetaryDenominations paginated
  *          tags: ["pagination"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/monetaryD'
  *          responses:
  *              200:
  *                  description: get monetaryDenomination succefully  
  *              401:
  *                  description: monetaryDenomination not authorized to get monetaryDenomination
  *          parameters: [
  *           {
  *              name: size,
  *              in: query,
  *              description: size to pagination,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *           {
  *              name: page,
  *              in: query,
  *              description: number of page paginate,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
router.post('/monetaryDenominations/?', MonetaryDenominationComponent.findpagination);



/**
  * @swagger
  * tags:
  *  name: pagination
  *  description: endpoints for managing api users.
  * components:
  *  schemas:
  *      user:
  *          type: string
  *          required:
  *              where
  *          example:
  *              where: isAdmin=false
  *      bank:
  *          type: string
  *          required:
  *              where
  *          example:
  *              where: accountingAccount>4
  *      billing:
  *          type: string
  *          required:
  *              where
  *          example:
  *              where: localBilling=true
  *      monetaryD:
  *          type: string
  *          required:
  *              where
  *          example:
  *              where: monetaryDenominationTypes=coin
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