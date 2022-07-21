const { Router } = require('express');
const { 
  BankComponent, 
  BillingResolutionComponent, 
  WarehouseComponent,
  TaxComponent,
  MonetaryDenominationComponent,
  MeasureUnitComponent,
  UserComponent,
  NotificationComponent,
  ProductStructureComponent,
  ProductAreaComponent,
  ProductLineComponent,
  ProductCategoryComponent,
  ProductGroupComponent,
  UnitMeasurementComponent,
  PreparationComponent,
  PreparationTypeComponent,
  ChatComponent,
  EventComponent,
  FileComponent,
  MessageComponent,
  ReportTypeComponent,
  SupportTicketComponent,
  TicketThreadComponent,
  EconomicActivitieComponent,
  FiscalResponsibilityComponent,
  ProductComponent,
  PriceByVolumeComponent,
  ProductMenuComponent,
  ProductParamComponent
} = require('../components');


const router = Router();

/**
  * @swagger
  *  /v1/page/productParams?:
  *      post:
  *          summary: get productParams paginated
  *          tags: ["pagination"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Pagination'
  *          responses:
  *              200:
  *                  description: get productParam succefully  
  *              401:
  *                  description: user not authorized to get productParam
  */
 router.post('/productParams/?', ProductParamComponent.findpagination);

/**
  * @swagger
  *  /v1/page/productMenus?:
  *      post:
  *          summary: get productMenus paginated
  *          tags: ["pagination"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Pagination'
  *          responses:
  *              200:
  *                  description: get productMenu succefully  
  *              401:
  *                  description: user not authorized to get productMenu
  */
 router.post('/productMenus/?', ProductMenuComponent.findpagination);


/**
  * @swagger
  *  /v1/page/productLines?:
  *      post:
  *          summary: get productLines paginated
  *          tags: ["pagination"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Pagination'
  *          responses:
  *              200:
  *                  description: get productLine succefully  
  *              401:
  *                  description: user not authorized to get productLine
  */
 router.post('/productLines/?', ProductLineComponent.findpagination);

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
  *                          $ref: '#/components/schemas/Pagination'
  *          responses:
  *              200:
  *                  description: get reportType succefully  
  *              401:
  *                  description: user not authorized to get reportType
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
  *                          $ref: '#/components/schemas/Pagination'
  *          responses:
  *              200:
  *                  description: get supportTicket succefully  
  *              401:
  *                  description: user not authorized to get supportTicket
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
  *                          $ref: '#/components/schemas/Pagination'
  *          responses:
  *              200:
  *                  description: get ticketThread succefully  
  *              401:
  *                  description: user not authorized to get ticketThread
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
  *                          $ref: '#/components/schemas/Pagination'
  *          responses:
  *              200:
  *                  description: get message succefully  
  *              401:
  *                  description: user not authorized to get message
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
  *                          $ref: '#/components/schemas/Pagination'
  *          responses:
  *              200:
  *                  description: get file succefully  
  *              401:
  *                  description: user not authorized to get file
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
  *                          $ref: '#/components/schemas/Pagination'
  *          responses:
  *              200:
  *                  description: get event succefully  
  *              401:
  *                  description: user not authorized to get event
  */
 router.post('/events/?', EventComponent.findpagination);


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
  *                          $ref: '#/components/schemas/Pagination'
  *          responses:
  *              200:
  *                  description: get user succefully  
  *              401:
  *                  description: user not authorized to get user
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
  *                          $ref: '#/components/schemas/Pagination'
  *          responses:
  *              200:
  *                  description: get bank succefully  
  *              401:
  *                  description: bank not authorized to get bank
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
  *                          $ref: '#/components/schemas/Pagination'
  *          responses:
  *              200:
  *                  description: get billingResolution succefully  
  *              401:
  *                  description: billingResolution not authorized to get billingResolution
  */
router.post('/billingResolutions/?', BillingResolutionComponent.findpagination);

/**
  * @swagger
  *  /v1/page/measureUnit?:
  *      get:
  *          summary: get MeasureUnits paginated
  *          tags: ["pagination"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Pagination'
  *          responses:
  *              200:
  *                  description: get MeasureUnit succefully  
  *              401:
  *                  description: MeasureUnit not authorized to get MeasureUnit
  */
 router.post('/measureUnit/?', MeasureUnitComponent.findpagination);

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
  *                          $ref: '#/components/schemas/Pagination'
  *          responses:
  *              200:
  *                  description: get monetaryDenomination succefully  
  *              401:
  *                  description: monetaryDenomination not authorized to get monetaryDenomination
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
  *                          $ref: '#/components/schemas/Pagination'
  *          responses:
  *              200:
  *                  description: get productArea succefully  
  *              401:
  *                  description: productArea not authorized to get productArea
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
*                          $ref: '#/components/schemas/Pagination'
*          responses:
*              200:
*                  description: get tax succefully  
*              401:
*                  description: tax not authorized to get tax
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
*                          $ref: '#/components/schemas/Pagination'
*          responses:
*              200:
*                  description: get tax succefully  
*              401:
*                  description: tax not authorized to get warehouses
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
*                          $ref: '#/components/schemas/Pagination'
*          responses:
*              200:
*                  description: get tax succefully  
*              401:
*                  description: tax not authorized to get tax
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
*                          $ref: '#/components/schemas/Pagination'
*          responses:
*              200:
*                  description: get tax succefully  
*              401:
*                  description: tax not authorized to get tax

*/
router.post('/productStructures/?', ProductStructureComponent.findpagination);


/**
  * @swagger
  * tags:
  *  name: pagination
  *  description: endpoints for managing api users.
  * components:
  *  schemas:
  *      Pagination:
  *          type: string
  *          required:
  *              where
  *          example:
  *              where: c
  *              isActive: false
  *              size: 8
  *              page: 1
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