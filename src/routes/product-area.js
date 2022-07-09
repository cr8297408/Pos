const { Router } = require('express');
const { ProductAreaComponent } = require('../components');

const router = Router();


/**
 * @swagger
 *  /v1/productAreas:
 *      get:
 *          summary: det all the productAreas;
 *          tags: ["productAreas"]
 *          responses:
 *              200:
 *                  description: get productAreas successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/productAreas'
 *              401:
 *                  description: error in get productAreas
 */
 router.get('/', ProductAreaComponent.findAll)

 /**
  * @swagger
  *  /v1/productAreas/{id}:
  *      get:
  *          summary: get one productArea by id
  *          tags: ["productAreas"]
  *          responses:
  *              200:
  *                  description: get productArea succefully  
  *              401:
  *                  description: user not authorized to get productArea
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id product area,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', ProductAreaComponent.findOne);
 
 /**
  * @swagger
  *  /v1/productAreas/{id}:
  *      delete:
  *          summary: delete a productArea
  *          tags: ["productAreas"]
  *          responses:
  *              200:
  *                  description: productArea deleted succesfully
  *              401:
  *                  description: user not authorized to delete productAreas
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the productArea,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', ProductAreaComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/productAreas/{id}:
  *      put:
  *          summary: put productArea in the DB
  *          tags: ["productAreas"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/productAreas'
  *          responses:
  *              200:
  *                  description: update productArea successfully
  *              401:
  *                  description: user not authorized to update productAreas
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the productArea,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', ProductAreaComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/productAreas:
  *      post:
  *          summary: added a productArea
  *          tags: ["productAreas"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/productAreas'
  *          responses:
  *              200:
  *                  description: productArea add successfully
  *              401:
  *                  descripion: user not authorized to add productAreas
  */
 router.post('/', ProductAreaComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: productAreas
  *  description: endpoints for managing api productAreas.
  * components:
  *  schemas:
  *      productAreas:
  *          type: object
  *          required:
  *              -name
  *          properties:
  *              id:
  *                  type: string
  *              name:
  *                  type: string,
  *              attentionArea:
  *                    type: string
  *              description:
  *                  type: string,
  *              isActive:
  *                  type: boolean
  *          example:
  *              attentionArea: false
  *              name: area prueba
  *              description: prueba descripcion
  *              isActive: true
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