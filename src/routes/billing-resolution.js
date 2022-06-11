const { Router } = require('express');
const { BillingResolutionComponent } = require('../components');

const BillingResolution = require('../components/Billing-resolution');
const BillingResolutionService = require('../components/Billing-resolution/service');

const router = Router();


/**
 * GET method route
 * @example http://localhost:PORT/v1/BillingResolutions
 *
 * @swagger
 * /v1/BillingResolutions:
 *   get:
 *     description: Get all stored BillingResolutions in Database
 *     tags: ["BillingResolution"]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of BillingResolutions
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/BillingResolutions'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.get('/', BillingResolutionComponent.findAll)

/**
 * POST method route
 * @example http://localhost:PORT/v1/BillingResolutions
 *
 * @swagger
 * /v1/BillingResolutions:
 *   post:
 *      description: Create new BillingResolution
 *      tags: ["BillingResolution"]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        description: BillingResolution creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BillingResolutionSchema'
 *            example:
 *              client: idclientprueba,
 *              serial: tyrue363jasdjd7eserial,
 *              start_date: 2022-09-06T05:00:00.000Z,
 *              expired_date: 09-06-2023,
 *              nodes: 2,
 *              isActive: true
 *      responses:
 *        201:
 *          description: return created BillingResolution
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/BillingResolutionSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', BillingResolutionComponent.create)

/**
 * GET method route
 * @example http://localhost:PORT/v1/billingResolutions/id
 *
 * @swagger
 * /v1/BillingResolutions/{id}:
 *   get:
 *     description: Get one BillingResolution in Database
 *     tags: ["BillingResolution"]
 *     parameters: [
 *        {
 *          name: id,
 *          in: path,
 *          description: id of the BillingResolution
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
 *         description: A entity od BillingResolution
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/BillingResolutions'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

 router.get('/:id', BillingResolutionComponent.findOne);

 /**
  * DELETE method route
  * @example http://localhost:PORT/v1/BillingResolutions/id
  *
  * @swagger
  * /v1/BillingResolutions/{id}:
  *   get:
  *     description: delete one BillingResolutions in Database
  *     tags: ["BillingResolution"]
  *     parameters: [
  *        {
  *          name: id,
  *          in: path,
  *          description: id of the BillingResolution
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
  *         description: a BillingResolution updated
  *         content:
  *           application/json:
  *             schema:
  *               oneOf:
  *                - $ref: '#/components/schemas/BillingResolutions'
  *       default:
  *          description: unexpected error
  *          content:
  *            application/json:
  *              schema:
  *                $ref: '#/components/schemas/Error'
  */
 
 router.delete('/:id', BillingResolutionComponent.deleteOne);
 
 /**
  * PUT method route
  * @example http://localhost:PORT/v1/BillingResolutions/id
  *
  * @swagger
  * /v1/BillingResolutions/{id}:
  *   get:
  *     description: update a BillingResolution in Database
  *     tags: ["BillingResolution"]
  *     parameters: [
  *        {
  *          name: id,
  *          in: path,
  *          description: id of the BillingResolution
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
  *                - $ref: '#/components/schemas/BillingResolutions'
  *       default:
  *          description: unexpected error
  *          content:
  *            application/json:
  *              schema:
  *                $ref: '#/components/schemas/Error'
  */
 
 router.put('/:id', BillingResolutionComponent.updateOne);

module.exports = router;