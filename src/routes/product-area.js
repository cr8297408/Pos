const { Router } = require('express');
const { ProductAreaComponent } = require('../components');

const ProductArea = require('../components/Product-area');
const ProductAreaService = require('../components/Product-area/service');

const router = Router();


/**
 * GET method route
 * @example http://localhost:PORT/v1/ProductAreas
 *
 * @swagger
 * /v1/ProductAreas:
 *   get:
 *     description: Get all stored ProductAreas in Database
 *     tags: ["ProductArea"]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of ProductAreas
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/ProductAreas'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.get('/', ProductAreaComponent.findAll)

/**
 * GET method route
 * @example http://localhost:PORT/v1/ProductAreas/id
 *
 * @swagger
 * /v1/ProductAreas/{id}:
 *   get:
 *     description: Get one ProductArea in Database
 *     tags: ["ProductArea"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the ProductArea
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
 *         description: A entity od ProductArea
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/ProductAreas'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.get('/:id', ProductAreaComponent.findOne);

/**
 * DELETE method route
 * @example http://localhost:PORT/v1/ProductAreas/id
 *
 * @swagger
 * /v1/ProductAreas/{id}:
 *   get:
 *     description: delete one ProductAreas in Database
 *     tags: ["ProductArea"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the ProductArea
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
 *         description: a ProductArea updated
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/ProductAreas'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.delete('/:id', ProductAreaComponent.deleteOne);

/**
 * PUT method route
 * @example http://localhost:PORT/v1/ProductAreas/id
 *
 * @swagger
 * /v1/ProductAreas/{id}:
 *   get:
 *     description: update a ProductArea in Database
 *     tags: ["ProductArea"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the ProductArea
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
 *                - $ref: '#/components/schemas/ProductAreas'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.put('/:id', ProductAreaComponent.updateOne);

/**
 * POST method route
 * @example http://localhost:PORT/v1/ProductAreas
 *
 * @swagger
 * /v1/ProductAreas:
 *   post:
 *      description: Create new ProductArea
 *      tags: ["ProductArea"]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        description: ProductArea creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductAreaSchema'
 *            example:
 *              client: idclientprueba,
 *              serial: tyrue363jasdjd7eserial,
 *              start_date: 2022-09-06T05:00:00.000Z,
 *              expired_date: 09-06-2023,
 *              nodes: 2,
 *              isActive: true
 *      responses:
 *        201:
 *          description: return created ProductArea
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/ProductAreaSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', ProductAreaComponent.create)

module.exports = router;