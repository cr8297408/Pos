const db = require('../../../../config/connection/connectBd');
const ProductCategoryValidation = require('./validation');
const ProductCategory = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination');
const permissions = require('../../../../shared/middlewares/permissions');
const getUser = require('../../../../shared/middlewares/getUser');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {ProductCategory} model
 */
const ProductCategoryService = {
  /**
   * @exports
   * @implements {ProductCategory} model
   * @description get all ProductCategorys 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const ProductCategorys = await ProductCategory.findAll()
        return ProductCategorys;
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
   * @implements {ProductCategory} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = ProductCategoryValidation.createProductCategory(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const user = await getUser(bearerHeader);
        const createProductCategory = await ProductCategory.create({
          name: body.name,
          description: body.description,
          createdBy: user.id
        });
        return createProductCategory;
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
   * @implements {ProductCategory} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = ProductCategoryValidation.getProductCategory(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getProductCategory = await ProductCategory.findByPk(id)
        return getProductCategory;
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
   * @implements {ProductCategory} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await ProductCategoryValidation.getProductCategory(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getProductCategory = await ProductCategory.findByPk(id);
        
        await getProductCategory.destroy()

        return getProductCategory;
        
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
   * @description update a ProductCategory in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await ProductCategoryValidation.getProductCategory(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await ProductCategoryValidation.createProductCategory(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const user = await getUser(bearerHeader);
        const newProductCategory = await ProductCategory.update(
          {
            name: body.name,
            description: body.description,
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return newProductCategory;
        
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
        const ProductCategorys = await Pagination('ProductCategorys',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return ProductCategorys
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

module.exports = ProductCategoryService;