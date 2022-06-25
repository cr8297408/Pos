const db = require('../../../../config/connection/connectBd');
const ProductGroupValidation = require('./validation');
const ProductGroup = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination')
const permissions = require('../../../../shared/middlewares/permissions')

sequelize = db.sequelize;

/**
 * @exports
 * @implements {ProductGroup} model
 */
const ProductGroupService = {
  /**
   * @exports
   * @implements {ProductGroup} model
   * @description get all ProductGroups 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const ProductGroups = await ProductGroup.findAll()
        return ProductGroups;
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
   * @implements {ProductGroup} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = ProductGroupValidation.createProductGroup(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const createProductGroup = await ProductGroup.create(body);
        return createProductGroup;
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
   * @implements {ProductGroup} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = ProductGroupValidation.getProductGroup(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getProductGroup = await ProductGroup.findByPk(id)
        return getProductGroup;
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
   * @implements {ProductGroup} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await ProductGroupValidation.getProductGroup(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getProductGroup = await ProductGroup.findByPk(id);
        
        await getProductGroup.destroy()

        return getProductGroup;
        
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
   * @description update a ProductGroup in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await ProductGroupValidation.getProductGroup(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await ProductGroupValidation.createProductGroup(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const newProductGroup = await ProductGroup.update(
          {
            name: body.name,
            accountingAccount: body.accountingAccount 
          },
          {where: {id}}
        )
  
        return newProductGroup;
        
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
        const ProductGroups = await Pagination('ProductGroups',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return ProductGroups
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

module.exports = ProductGroupService;