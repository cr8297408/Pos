const db = require('../../config/connection/connectBd');
const ProductLineValidation = require('./validation');
const ProductLine = require('./model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions');
const ProductStructure = require('../product-structure/model');

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
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const ProductLines = await ProductLine.findAll()
        return ProductLines;
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch(error) {
      throw new Error(error.message)
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {ProductLine} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = ProductLineValidation.createProductLine(body);
        if (validate.error) {
          throw new Error(validate.error)
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
          return {
            message: 'nombre o codigo en uso',
            status: 400
          }
        }
        const searchStructure = await ProductStructure.findOne({
          where: {
            id: body.ProductStructureId
          }
        })
        if (searchStructure) {
          const createProductLine = await ProductLine.create(body);
          return createProductLine;
        }
        return {
          message: 'el campo ProductStructureId no corresponde a ningun ProductStructure en la BD',
          status: 400
        }
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
      
    } catch (error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @implements {ProductLine} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = ProductLineValidation.getProductLine(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getProductLine = await ProductLine.findByPk(id)
        return getProductLine;
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {ProductLine} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await ProductLineValidation.getProductLine(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getProductLine = await ProductLine.findByPk(id);
        
        await getProductLine.destroy()

        return getProductLine;
        
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      throw new Error(error)
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
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await ProductLineValidation.getProductLine(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await ProductLineValidation.createProductLine(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const newProductLine = await ProductLine.update(
          {
            name: body.name,
            code: body.code,
            ProductStructureId: body.ProductStructureId 
          },
          {where: {id}}
        )
  
        return newProductLine;
        
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_PAGINATION')
      if (validatePermission) {
        const ProductLines = await Pagination('ProductLines',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return ProductLines
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
        throw new Error(error.message);
    }
  },
}

module.exports = ProductLineService;