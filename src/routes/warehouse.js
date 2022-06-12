const { Router } = require('express');
const { WarehouseComponent } = require('../components');

const Warehouse = require('../components/warehouse');

const router = Router();


/**
 * @swagger
 *  /v1/warehouses:
 *      get:
 *          summary: det all the warehouses;
 *          tags: ["warehouses"]
 *          responses:
 *              200:
 *                  description: get warehouses successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/warehouses'
 *              401:
 *                  description: error in get warehouses
 */
 router.get('/', WarehouseComponent.findAll)

 /**
  * @swagger
  *  /v1/warehouses/{id}:
  *      get:
  *          summary: get one warehouse by id
  *          tags: ["warehouses"]
  *          responses:
  *              200:
  *                  description: get warehouse succefully  
  *              401:
  *                  description: user not authorized to get warehouse
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id warehouse,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', WarehouseComponent.findOne);
 
 /**
  * @swagger
  *  /v1/warehouses/{id}:
  *      delete:
  *          summary: delete a warehouse
  *          tags: ["warehouses"]
  *          responses:
  *              200:
  *                  description: warehouse deleted succesfully
  *              401:
  *                  description: user not authorized to delete warehouses
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the warehouse,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', WarehouseComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/warehouses/{id}:
  *      put:
  *          summary: put warehouse in the DB
  *          tags: ["warehouses"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/warehouses'
  *          responses:
  *              200:
  *                  description: update warehouse successfully
  *              401:
  *                  description: user not authorized to update warehouses
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the warehouse,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', WarehouseComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/warehouses:
  *      post:
  *          summary: added a warehouse
  *          tags: ["warehouses"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/warehouses'
  *          responses:
  *              200:
  *                  description: warehouse add successfully
  *              401:
  *                  descripion: user not authorized to add warehouses
  */
 router.post('/', WarehouseComponent.create)
 
/**
 * @swagger
 * tags:
 *  name: warehouses
 *  description: endpoints for managing api warehouses.
 * components:
 *  schemas:
 *      warehouses:
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
 *              name: "almacen prueba"
 *              code: "prueba wareh"
 *              location: "risaralda"
 *              description: "almacen de prueba api"
 *              warehouseTypes: "warehouse billing"
 *              BillingResolutionId: "idbillingsdkjs"
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