const { Router } = require('express');
const { 
  UserComponent, 
  BankComponent, 
  BillingResolutionComponent, 
  MeasureUnitComponent,
  MonetaryDenominationComponent,
  ProductAreaComponent,
  TaxComponent,
  WarehouseComponent,
  NotificationComponent,
  ProductStructureComponent,
  ChatComponent,
  EventComponent,
  FileComponent,
  MessageComponent,
  ReportTypeComponent,
  SupportTicketComponent,
  TicketThreadComponent,
} = require('../components');


const router = Router();

/**
  * @swagger
  *  /v1/page/reportTypes?:
  *      post:
  *          summary: get reportTypes paginated
  *          tags: ["pagination"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/reportType'
  *          responses:
  *              200:
  *                  description: get reportType succefully  
  *              401:
  *                  description: user not authorized to get reportType
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
 router.post('/reportTypes/?', ReportTypeComponent.findpagination);

/**
  * @swagger
  *  /v1/page/supportTickets?:
  *      post:
  *          summary: get supportTickets paginated
  *          tags: ["pagination"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/supportTicket'
  *          responses:
  *              200:
  *                  description: get supportTicket succefully  
  *              401:
  *                  description: user not authorized to get supportTicket
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
 router.post('/supportTickets/?', SupportTicketComponent.findpagination);

 /**
  * @swagger
  *  /v1/page/ticketThreads?:
  *      post:
  *          summary: get ticketThreads paginated
  *          tags: ["pagination"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/ticketThread'
  *          responses:
  *              200:
  *                  description: get ticketThread succefully  
  *              401:
  *                  description: user not authorized to get ticketThread
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
  router.post('/ticketThreads/?', TicketThreadComponent.findpagination);

/**
  * @swagger
  *  /v1/page/messages?:
  *      post:
  *          summary: get messages paginated
  *          tags: ["pagination"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/message'
  *          responses:
  *              200:
  *                  description: get message succefully  
  *              401:
  *                  description: user not authorized to get message
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
 router.post('/messages/?', MessageComponent.findpagination);


/**
  * @swagger
  *  /v1/page/files?:
  *      post:
  *          summary: get files paginated
  *          tags: ["pagination"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/file'
  *          responses:
  *              200:
  *                  description: get file succefully  
  *              401:
  *                  description: user not authorized to get file
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
 router.post('/files/?', FileComponent.findpagination);

/**
  * @swagger
  *  /v1/page/events?:
  *      post:
  *          summary: get events paginated
  *          tags: ["pagination"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/event'
  *          responses:
  *              200:
  *                  description: get event succefully  
  *              401:
  *                  description: user not authorized to get event
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
 router.post('/events/?', EventComponent.findpagination);


/**
  * @swagger
  *  /v1/page/chats?:
  *      post:
  *          summary: get chats paginated
  *          tags: ["pagination"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/chat'
  *          responses:
  *              200:
  *                  description: get chat succefully  
  *              401:
  *                  description: user not authorized to get chat
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
 router.post('/chats/?', ChatComponent.findpagination);

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
  *  /v1/page/productAreas?:
  *      post:
  *          summary: get productAreas paginated
  *          tags: ["pagination"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/productA'
  *          responses:
  *              200:
  *                  description: get productArea succefully  
  *              401:
  *                  description: productArea not authorized to get productArea
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
  router.post('/productAreas/?', ProductAreaComponent.findpagination);

/**
* @swagger
*  /v1/page/taxes?:
*      post:
*          summary: get taxes paginated
*          tags: ["pagination"]
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/tax'
*          responses:
*              200:
*                  description: get tax succefully  
*              401:
*                  description: tax not authorized to get tax
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
router.post('/taxes/?', TaxComponent.findpagination);

 /**
* @swagger
*  /v1/page/warehouses?:
*      post:
*          summary: get warehouses paginated
*          tags: ["pagination"]
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/wareh'
*          responses:
*              200:
*                  description: get tax succefully  
*              401:
*                  description: tax not authorized to get tax
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
router.post('/warehouses/?', WarehouseComponent.findpagination);

 /**
* @swagger
*  /v1/page/notifications?:
*      post:
*          summary: get notifications paginated
*          tags: ["pagination"]
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/notif'
*          responses:
*              200:
*                  description: get tax succefully  
*              401:
*                  description: tax not authorized to get tax
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
router.post('/notifications/?', NotificationComponent.findpagination);

 /**
* @swagger
*  /v1/page/productStructures?:
*      post:
*          summary: get productStructures paginated
*          tags: ["pagination"]
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/prodStr'
*          responses:
*              200:
*                  description: get tax succefully  
*              401:
*                  description: tax not authorized to get tax
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
router.post('/productStructures/?', ProductStructureComponent.findpagination);


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
  *      productA:
  *         type: string
  *         required:
  *             where:
  *         example:
  *              where: attentionArea=false
  *      tax:
  *          type: string
  *          required:
  *              where
  *          example:
  *              where: isActive=true
  *      wareh:
  *          type: string
  *          required:
  *              where
  *          example:
  *              where: location=risaralda
  *      notif:
  *          type: string
  *          required:
  *              where
  *          example:
  *              where: type=PERSONAL
  *      prodStr:
  *          type: string
  *          required:
  *              where
  *          example:
  *              where: code=code3232
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