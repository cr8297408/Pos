const db = require('../../../../config/connection/connectBd');
const ProductLineValidation = require('./validation');
const ProductLine = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination')
const permissions = require('../../../../shared/middlewares/permissions');
const ProductStructure = require('../product-structure/model');
const getUser = require('../../../../shared/middlewares/getUser');
const HttpResponse = require('../../../../shared/response');
const { Op } = require('sequelize');


sequelize = db.sequelize;

/**
 * @exports
 * @implements {ProductLine} model
 */
const ProductLineService = {
  /**
   * @exports
   * @implements {ProductLine} model
   * @description get all ProductLines 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_PRODUCT_LINE'])
      if (validatePermission) {
        const ProductLines = await ProductLine.findAll()
        return new HttpResponse(200, ProductLines);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch(error) {
      throw new HttpResponse(400, error.message)
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {ProductLine} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_PRODUCT_LINE'])
      if (validatePermission) {
        const validate = ProductLineValidation.createProductLine(body);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }

        const existsLine = await ProductLine.findOne({
          where: {
            [Op.or]: [
              {name: body.name},
              {code: body.code}
            ]
          }
        })

        if (existsLine) {
          return new HttpResponse(400, 'nombre o codigo en uso')
        }
        const searchStructure = await ProductStructure.findOne({
          where: {
            id: body.ProductStructureId
          }
        })
        if (searchStructure) {
          const user = await getUser(bearerHeader);
          const createProductLine = await ProductLine.create({
            name: body.name,
            code: body.code,
            ProductStructureId: body.ProductStructureId,
            isActive: body.isActive,
            createdBy: user.id
          });
          return new HttpResponse(201, createProductLine);
        }
        return new HttpResponse(400, 'el campo ProductStructureId no corresponde a ninguna estructura de producto')
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')
      
    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @implements {ProductLine} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_PRODUC_LINE'])
      if (validatePermission) {
        const validate = ProductLineValidation.getProductLine(id);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const getProductLine = await ProductLine.findByPk(id)
        return new HttpResponse(200, getProductLine);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {ProductLine} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_PRODUCT_LINE'])
      if (validatePermission) {
        const validate = await ProductLineValidation.getProductLine(id)

        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }

        const getProductLine = await ProductLine.findByPk(id);
        
        await getProductLine.destroy()

        return new HttpResponse(200, 'linea eliminada');
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a ProductLine in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_PRODUCT_LINE'])
      if (validatePermission) {
        
        const validateid = await ProductLineValidation.getProductLine(id);
        
        if (validateid.error) {
          throw new HttpResponse(400, validate.error)
        }
        
        if(body.name){
          const existsLine = await ProductLine.findOne({
            where: {
              name: body.name
            }
          })
  
          if (existsLine) {
            return new HttpResponse(400, 'nombre en uso')
          }
        }

        const user = await getUser(bearerHeader);
        const newProductLine = await ProductLine.update(
          {
            name: body.name,
            code: body.code,
            ProductStructureId: body.ProductStructureId,
            isActive: body.isActive,
            updatedBy: user.id 
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'linea actualizada');
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message);      
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_PRODUCT_LINE']);
      if (validatePermission) {
        
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM productLines WHERE name LIKE '%${wherecond}%' AND isActive = ${isActive} OR code LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const productLines = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, productLines)

      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
        throw new HttpResponse(400, error.message);
    }
  },
}

module.exports = ProductLineService;