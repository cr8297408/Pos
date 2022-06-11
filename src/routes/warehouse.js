const { Router } = require('express');
const { WarehouseComponent } = require('../components');

const Warehouse = require('../components/warehouse');

const router = Router();


/**
 * GET method route
 * @example http://localhost:PORT/v1/Warehouses
 *
 * @swagger
 * /v1/Warehouses:
 *   get:
 *     description: Get all stored Warehouses in Database
 *     tags: ["Warehouse"]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of Warehouses
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Warehouses'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.get('/', WarehouseComponent.findAll)

/**
 * POST method route
 * @example http://localhost:PORT/v1/Warehouses
 *
 * @swagger
 * /v1/Warehouses:
 *   post:
 *      description: Create new Warehouse
 *      tags: ["Warehouse"]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        description: Warehouse creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/WarehouseSchema'
 *            example:
 *              client: idclientprueba,
 *              serial: tyrue363jasdjd7eserial,
 *              start_date: 2022-09-06T05:00:00.000Z,
 *              expired_date: 09-06-2023,
 *              nodes: 2,
 *              isActive: true
 *      responses:
 *        201:
 *          description: return created Warehouse
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/WarehouseSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', WarehouseComponent.create)

/**
 * GET method route
 * @example http://localhost:PORT/v1/Warehouse/id
 *
 * @swagger
 * /v1/Warehouse/{id}:
 *   get:
 *     description: Get one Warehouse in Database
 *     tags: ["Warehouse"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the Warehouse
 *          required: true,
 *          schema: {
 *            type: string,
 *          }
 *        }
 *     ] 
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: A entity od Warehouse
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Warehouse'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

 router.get('/:id', WarehouseComponent.findOne);

 /**
  * DELETE method route
  * @example http://localhost:PORT/v1/Warehouse/id
  *
  * @swagger
  * /v1/Warehouse/{id}:
  *   get:
  *     description: delete one Warehouse in Database
  *     tags: ["Warehouse"]
  *     parameters: [
  *        {
  *          name: id,
  *          in: path,
  *          description: id of the Warehouse
  *          required: true,
  *          schema: {
  *            type: string,
  *          }
  *        }
  *     ] 
  *     security:
  *      - bearerAuth: []
  *     responses:
  *       200:
  *         description: a Warehouse updated
  *         content:
  *           application/json:
  *             schema:
  *               oneOf:
  *                - $ref: '#/components/schemas/Warehouse'
  *       default:
  *          description: unexpected error
  *          content:
  *            application/json:
  *              schema:
  *                $ref: '#/components/schemas/Error'
  */
 
 router.delete('/:id', WarehouseComponent.deleteOne);
 
 /**
  * PUT method route
  * @example http://localhost:PORT/v1/Warehouse/id
  *
  * @swagger
  * /v1/Warehouse/{id}:
  *   get:
  *     description: update a Warehouse in Database
  *     tags: ["Warehouse"]
  *     parameters: [
  *        {
  *          name: id,
  *          in: path,
  *          description: id of the Warehouse
  *          required: true,
  *          schema: {
  *            type: string,
  *          }
  *        }
  *     ] 
  *     security:
  *      - bearerAuth: []
  *     responses:
  *       200:
  *         description: a number, 1 true, 0 false
  *         content:
  *           application/json:
  *             schema:
  *               oneOf:
  *                - $ref: '#/components/schemas/Warehouse'
  *       default:
  *          description: unexpected error
  *          content:
  *            application/json:
  *              schema:
  *                $ref: '#/components/schemas/Error'
  */
 
 router.put('/:id', WarehouseComponent.updateOne);


module.exports = router;