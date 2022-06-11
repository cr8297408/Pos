const { Router } = require('express');
const { MeasureUnitComponent } = require('../components');

const MeasureUnit = require('../components/measure-unit');
const MeasureUnitService = require('../components/measure-unit/service');

const router = Router();


/**
 * GET method route
 * @example http://localhost:PORT/v1/MeasureUnits
 *
 * @swagger
 * /v1/MeasureUnits:
 *   get:
 *     description: Get all stored MeasureUnits in Database
 *     tags: ["MeasureUnit"]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of MeasureUnits
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/MeasureUnits'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.get('/', MeasureUnitComponent.findAll)

/**
 * GET method route
 * @example http://localhost:PORT/v1/MeasureUnits/id
 *
 * @swagger
 * /v1/MeasureUnits/{id}:
 *   get:
 *     description: Get one MeasureUnit in Database
 *     tags: ["MeasureUnit"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the MeasureUnit
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
 *         description: A entity od MeasureUnit
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/MeasureUnits'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.get('/:id', MeasureUnitComponent.findOne);

/**
 * DELETE method route
 * @example http://localhost:PORT/v1/MeasureUnits/id
 *
 * @swagger
 * /v1/MeasureUnits/{id}:
 *   get:
 *     description: delete one MeasureUnits in Database
 *     tags: ["MeasureUnit"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the MeasureUnit
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
 *         description: a MeasureUnit updated
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/MeasureUnits'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.delete('/:id', MeasureUnitComponent.deleteOne);

/**
 * PUT method route
 * @example http://localhost:PORT/v1/MeasureUnits/id
 *
 * @swagger
 * /v1/MeasureUnits/{id}:
 *   get:
 *     description: update a MeasureUnit in Database
 *     tags: ["MeasureUnit"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the MeasureUnit
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
 *                - $ref: '#/components/schemas/MeasureUnits'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.put('/:id', MeasureUnitComponent.updateOne);

/**
 * POST method route
 * @example http://localhost:PORT/v1/MeasureUnits
 *
 * @swagger
 * /v1/MeasureUnits:
 *   post:
 *      description: Create new MeasureUnit
 *      tags: ["MeasureUnit"]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        description: MeasureUnit creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MeasureUnitSchema'
 *            example:
 *              client: idclientprueba,
 *              serial: tyrue363jasdjd7eserial,
 *              start_date: 2022-09-06T05:00:00.000Z,
 *              expired_date: 09-06-2023,
 *              nodes: 2,
 *              isActive: true
 *      responses:
 *        201:
 *          description: return created MeasureUnit
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/MeasureUnitSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', MeasureUnitComponent.create)

module.exports = router;