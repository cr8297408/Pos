const { Router } = require('express');
const { BankComponent } = require('../components');

const bank = require('../components/bank');
const bankService = require('../components/bank/service');

const router = Router();


/**
 * GET method route
 * @example http://localhost:PORT/v1/banks
 *
 * @swagger
 * /v1/banks:
 *   get:
 *     description: Get all stored banks in Database
 *     tags: ["bank"]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of banks
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/banks'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.get('/', BankComponent.findAll)

/**
 * GET method route
 * @example http://localhost:PORT/v1/banks/id
 *
 * @swagger
 * /v1/banks/{id}:
 *   get:
 *     description: Get one bank in Database
 *     tags: ["bank"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the bank
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
 *         description: A entity od bank
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/banks'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.get('/:id', BankComponent.findOne);

/**
 * DELETE method route
 * @example http://localhost:PORT/v1/banks/id
 *
 * @swagger
 * /v1/banks/{id}:
 *   get:
 *     description: delete one banks in Database
 *     tags: ["bank"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the bank
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
 *         description: a bank updated
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/banks'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.delete('/:id', BankComponent.deleteOne);

/**
 * PUT method route
 * @example http://localhost:PORT/v1/banks/id
 *
 * @swagger
 * /v1/banks/{id}:
 *   get:
 *     description: update a bank in Database
 *     tags: ["bank"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the bank
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
 *                - $ref: '#/components/schemas/banks'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.put('/:id', BankComponent.updateOne);

/**
 * POST method route
 * @example http://localhost:PORT/v1/banks
 *
 * @swagger
 * /v1/banks:
 *   post:
 *      description: Create new bank
 *      tags: ["bank"]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        description: bank creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/bankSchema'
 *            example:
 *              client: idclientprueba,
 *              serial: tyrue363jasdjd7eserial,
 *              start_date: 2022-09-06T05:00:00.000Z,
 *              expired_date: 09-06-2023,
 *              nodes: 2,
 *              isActive: true
 *      responses:
 *        201:
 *          description: return created bank
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/bankSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', BankComponent.create)

module.exports = router;