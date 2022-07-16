const { Router } = require('express');
const { EconomicActivitieComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/EconomicActivities:
 *      get:
 *          summary: get all the EconomicActivities;
 *          tags: ["EconomicActivities"]
 *          responses:
 *              200:
 *                  description: get EconomicActivities successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/EconomicActivities'
 *              401:
 *                  description: error in get EconomicActivities
 */
 router.get('/', EconomicActivitieComponent.findAll)

 /**
  * @swagger
  *  /v1/EconomicActivities/{id}:
  *      get:
  *          summary: get one EconomicActivitie by id
  *          tags: ["EconomicActivities"]
  *          responses:
  *              200:
  *                  description: get EconomicActivitie succefully  
  *              401:
  *                  description: user not authorized to get EconomicActivitie
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the EconomicActivitie,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', EconomicActivitieComponent.findOne);
 
 /**
  * @swagger
  *  /v1/EconomicActivities/{id}:
  *      delete:
  *          summary: delete a EconomicActivitie
  *          tags: ["EconomicActivities"]
  *          responses:
  *              200:
  *                  description: EconomicActivitie deleted succesfully
  *              401:
  *                  description: user not authorized to delete EconomicActivities
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the EconomicActivitie,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', EconomicActivitieComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/EconomicActivities/{id}:
  *      put:
  *          summary: put EconomicActivitie in the DB
  *          tags: ["EconomicActivities"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/EconomicActivities'
  *          responses:
  *              200:
  *                  description: update EconomicActivitie successfully
  *              401:
  *                  description: user not authorized to update EconomicActivities
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the EconomicActivitie,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', EconomicActivitieComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/EconomicActivities:
  *      post:
  *          summary: added a EconomicActivitie
  *          tags: ["EconomicActivities"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/EconomicActivities'
  *          responses:
  *              200:
  *                  description: EconomicActivitie add successfully
  *              401:
  *                  description: user not authorized to add EconomicActivities
  */
 router.post('/', EconomicActivitieComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: EconomicActivities
  *  description: endpoints for managing api EconomicActivities.
  * components:
  *  schemas:
  *      EconomicActivities:
  *          type: object
  *          required:
  *              -nameActivity
  *              -codeCiu
  *              -codeActivity
  *              -rate
  *          properties:
  *              id:
  *                  type: string
  *              nameActivity:
  *                  type: string
  *              codeCiu:
  *                  type: number
  *              codeActivity:
  *                  type: number
  *              rate:
  *                  type: number
  *          example:
  *              nameActivity: actividad 1
  *              codeCiu: 1
  *              codeActivity: 123
  *              rate: 23
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