const db = require('../../config/connection/connectBd');
const ProductStructureValidation = require('./validation');
const ProductStructure = require('./model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions');
const { Op } = require('sequelize');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {ProductStructure} model
 */
const ProductStructureService = {
  /**
   * @exports
   * @implements {ProductStructure} model
   * @description get all ProductStructures 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const ProductStructures = await ProductStructure.findAll()
        return ProductStructures;
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
   * @implements {ProductStructure} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = ProductStructureValidation.createProductStructure(body);
        if (validate.error) {
          throw new Error(validate.error)
        }

        const existsStruct = await ProductStructure.findOne({
          where: {
            [Op.or]: [
              {name: body.name},
              {code: body.code}
            ]
          }
        })

        if (!existsStruct) {
          const createProductStructure = await ProductStructure.create(body);
          return createProductStructure;
        }
        return {
          message: 'nombre o codigo en uso',
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
   * @implements {ProductStructure} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = ProductStructureValidation.getProductStructure(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getProductStructure = await ProductStructure.findByPk(id)
        return getProductStructure;
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
   * @implements {ProductStructure} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await ProductStructureValidation.getProductStructure(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getProductStructure = await ProductStructure.findByPk(id);
        
        await getProductStructure.destroy()

        return getProductStructure;
        
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
   * @description update a ProductStructure in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await ProductStructureValidation.getProductStructure(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await ProductStructureValidation.createProductStructure(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const newProductStructure = await ProductStructure.update(
          {
            name: body.name,
            code: body.code 
          },
          {where: {id}}
        )
  
        return newProductStructure;
        
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
        const ProductStructures = await Pagination('ProductStructures',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return ProductStructures
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

module.exports = ProductStructureService;