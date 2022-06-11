const { Router } = require('express');
const { __name__Component } = require('../components');

const __name__ = require('../components/__name__');
const __name__Service = require('../components/__name__/service');

const router = Router();


/**
 * GET method route
 * @example http://localhost:PORT/v1/__name__s
 *
 * @swagger
 * /v1/__name__s:
 *   get:
 *     description: Get all stored __name__s in Database
 *     tags: ["__name__"]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of __name__s
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/__name__s'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.get('/', __name__Component.findAll)

/**
 * GET method route
 * @example http://localhost:PORT/v1/__name__s/id
 *
 * @swagger
 * /v1/__name__s/{id}:
 *   get:
 *     description: Get one __name__ in Database
 *     tags: ["__name__"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the __name__
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
 *         description: A entity od __name__
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/__name__s'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.get('/:id', __name__Component.findOne);

/**
 * DELETE method route
 * @example http://localhost:PORT/v1/__name__s/id
 *
 * @swagger
 * /v1/__name__s/{id}:
 *   get:
 *     description: delete one __name__s in Database
 *     tags: ["__name__"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the __name__
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
 *         description: a __name__ updated
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/__name__s'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.delete('/:id', __name__Component.deleteOne);

/**
 * PUT method route
 * @example http://localhost:PORT/v1/__name__s/id
 *
 * @swagger
 * /v1/__name__s/{id}:
 *   get:
 *     description: update a __name__ in Database
 *     tags: ["__name__"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the __name__
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
 *                - $ref: '#/components/schemas/__name__s'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.put('/:id', __name__Component.updateOne);

/**
 * POST method route
 * @example http://localhost:PORT/v1/__name__s
 *
 * @swagger
 * /v1/__name__s:
 *   post:
 *      description: Create new __name__
 *      tags: ["__name__"]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        description: __name__ creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/__name__Schema'
 *            example:
 *              client: idclientprueba,
 *              serial: tyrue363jasdjd7eserial,
 *              start_date: 2022-09-06T05:00:00.000Z,
 *              expired_date: 09-06-2023,
 *              nodes: 2,
 *              isActive: true
 *      responses:
 *        201:
 *          description: return created __name__
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/__name__Schema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', __name__Component.create)

module.exports = router;