const { Router } = require('express');
const { UserComponent } = require('../components');

const User = require('./user');
const UserService = require('../components/user/service');

const router = Router();


/**
 * GET method route
 * @example http://localhost:PORT/v1/Users
 *
 * @swagger
 * /v1/Users:
 *   get:
 *     description: Get all stored Users in Database
 *     tags: ["User"]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of Users
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Users'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.get('/', UserComponent.findAll)

/**
 * GET method route
 * @example http://localhost:PORT/v1/Users/id
 *
 * @swagger
 * /v1/Users/{id}:
 *   get:
 *     description: Get one User in Database
 *     tags: ["User"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the User
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
 *         description: A entity od User
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Users'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.get('/:id', UserComponent.findOne);

/**
 * DELETE method route
 * @example http://localhost:PORT/v1/Users/id
 *
 * @swagger
 * /v1/Users/{id}:
 *   get:
 *     description: delete one Users in Database
 *     tags: ["User"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the User
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
 *         description: a User updated
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Users'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.delete('/:id', UserComponent.deleteOne);

/**
 * PUT method route
 * @example http://localhost:PORT/v1/Users/id
 *
 * @swagger
 * /v1/Users/{id}:
 *   get:
 *     description: update a User in Database
 *     tags: ["User"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the User
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
 *                - $ref: '#/components/schemas/Users'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.put('/:id', UserComponent.updateOne);

/**
 * POST method route
 * @example http://localhost:PORT/v1/Users
 *
 * @swagger
 * /v1/Users:
 *   post:
 *      description: Create new User
 *      tags: ["User"]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        description: User creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserSchema'
 *            example:
 *              client: idclientprueba,
 *              serial: tyrue363jasdjd7eserial,
 *              start_date: 2022-09-06T05:00:00.000Z,
 *              expired_date: 09-06-2023,
 *              nodes: 2,
 *              isActive: true
 *      responses:
 *        201:
 *          description: return created User
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/UserSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', UserComponent.create)

module.exports = router;