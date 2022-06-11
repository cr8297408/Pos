const { Router } = require('express');
const { TaxComponent } = require('../components');

const Tax = require('./tax');
const TaxService = require('../components/Tax/service');

const router = Router();


/**
 * GET method route
 * @example http://localhost:PORT/v1/Taxs
 *
 * @swagger
 * /v1/Taxs:
 *   get:
 *     description: Get all stored Taxs in Database
 *     tags: ["Tax"]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of Taxs
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Taxs'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.get('/', TaxComponent.findAll)

/**
 * GET method route
 * @example http://localhost:PORT/v1/Taxs/id
 *
 * @swagger
 * /v1/Taxs/{id}:
 *   get:
 *     description: Get one Tax in Database
 *     tags: ["Tax"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the Tax
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
 *         description: A entity od Tax
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Taxs'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.get('/:id', TaxComponent.findOne);

/**
 * DELETE method route
 * @example http://localhost:PORT/v1/Taxs/id
 *
 * @swagger
 * /v1/Taxs/{id}:
 *   get:
 *     description: delete one Taxs in Database
 *     tags: ["Tax"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the Tax
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
 *         description: a Tax updated
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Taxs'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.delete('/:id', TaxComponent.deleteOne);

/**
 * PUT method route
 * @example http://localhost:PORT/v1/Taxs/id
 *
 * @swagger
 * /v1/Taxs/{id}:
 *   get:
 *     description: update a Tax in Database
 *     tags: ["Tax"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the Tax
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
 *                - $ref: '#/components/schemas/Taxs'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.put('/:id', TaxComponent.updateOne);

/**
 * POST method route
 * @example http://localhost:PORT/v1/Taxs
 *
 * @swagger
 * /v1/Taxs:
 *   post:
 *      description: Create new Tax
 *      tags: ["Tax"]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        description: Tax creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaxSchema'
 *            example:
 *              client: idclientprueba,
 *              serial: tyrue363jasdjd7eserial,
 *              start_date: 2022-09-06T05:00:00.000Z,
 *              expired_date: 09-06-2023,
 *              nodes: 2,
 *              isActive: true
 *      responses:
 *        201:
 *          description: return created Tax
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/TaxSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', TaxComponent.create)

module.exports = router;