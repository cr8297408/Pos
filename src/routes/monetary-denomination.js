const { Router } = require('express');
const { MonetaryDenominationComponent } = require('../components');

const MonetaryDenomination = require('../components/monetary-denomination');
const MonetaryDenominationService = require('../components/monetary-denomination/service');

const router = Router();


/**
 * GET method route
 * @example http://localhost:PORT/v1/MonetaryDenominations
 *
 * @swagger
 * /v1/MonetaryDenominations:
 *   get:
 *     description: Get all stored MonetaryDenominations in Database
 *     tags: ["MonetaryDenomination"]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of MonetaryDenominations
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/MonetaryDenominations'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.get('/', MonetaryDenominationComponent.findAll)

/**
 * GET method route
 * @example http://localhost:PORT/v1/MonetaryDenominations/id
 *
 * @swagger
 * /v1/MonetaryDenominations/{id}:
 *   get:
 *     description: Get one MonetaryDenomination in Database
 *     tags: ["MonetaryDenomination"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the MonetaryDenomination
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
 *         description: A entity od MonetaryDenomination
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/MonetaryDenominations'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.get('/:id', MonetaryDenominationComponent.findOne);

/**
 * DELETE method route
 * @example http://localhost:PORT/v1/MonetaryDenominations/id
 *
 * @swagger
 * /v1/MonetaryDenominations/{id}:
 *   get:
 *     description: delete one MonetaryDenominations in Database
 *     tags: ["MonetaryDenomination"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the MonetaryDenomination
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
 *         description: a MonetaryDenomination updated
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/MonetaryDenominations'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.delete('/:id', MonetaryDenominationComponent.deleteOne);

/**
 * PUT method route
 * @example http://localhost:PORT/v1/MonetaryDenominations/id
 *
 * @swagger
 * /v1/MonetaryDenominations/{id}:
 *   get:
 *     description: update a MonetaryDenomination in Database
 *     tags: ["MonetaryDenomination"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the MonetaryDenomination
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
 *                - $ref: '#/components/schemas/MonetaryDenominations'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.put('/:id', MonetaryDenominationComponent.updateOne);

/**
 * POST method route
 * @example http://localhost:PORT/v1/MonetaryDenominations
 *
 * @swagger
 * /v1/MonetaryDenominations:
 *   post:
 *      description: Create new MonetaryDenomination
 *      tags: ["MonetaryDenomination"]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        description: MonetaryDenomination creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MonetaryDenominationSchema'
 *            example:
 *              client: idclientprueba,
 *              serial: tyrue363jasdjd7eserial,
 *              start_date: 2022-09-06T05:00:00.000Z,
 *              expired_date: 09-06-2023,
 *              nodes: 2,
 *              isActive: true
 *      responses:
 *        201:
 *          description: return created MonetaryDenomination
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/MonetaryDenominationSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', MonetaryDenominationComponent.create)

module.exports = router;