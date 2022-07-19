const db = require('../../../../config/connection/connectBd');
const ProductCategoryValidation = require('./validation');
const ProductCategory = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination');
const permissions = require('../../../../shared/middlewares/permissions');
const getUser = require('../../../../shared/middlewares/getUser');
const HttpResponse = require('../../../../shared/response');

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
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_PRODUCT_CATEGORY'])
      if (validatePermission) {
        const ProductCategorys = await ProductCategory.findAll()
        return new HttpResponse(ProductCategorys);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch(error) {
      throw new HttpResponse(400, error.message)
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {ProductCategory} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_PRODUCT_CATEGORY']);
      if (validatePermission) {
        const validate = ProductCategoryValidation.createProductCategory(body);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const user = await getUser(bearerHeader);

        
        const validateName = await ProductCategory.findOne({
          where: {
            name: body.name
          }
        })
        if (validateName) {
          return new HttpResponse(400, 'el nombre ya está en uso');
        }
        
        const createProductCategory = await ProductCategory.create({
          name: body.name,
          description: body.description,
          isActive: body.isActive,
          createdBy: user.id
        });
        return new HttpResponse(201, createProductCategory);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')
      
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {ProductCategory} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_PRODUCT_CATEGORY']);
      if (validatePermission) {
        const validate = ProductCategoryValidation.getProductCategory(id);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const getProductCategory = await ProductCategory.findByPk(id)
        return new HttpResponse(200, getProductCategory);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {ProductCategory} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_PRODUCT_CATEGORY']);
      if (validatePermission) {
        const validate = await ProductCategoryValidation.getProductCategory(id)

        if (validate.error) {
          throw new HttpResponse(validate.error)
        }

        const getProductCategory = await ProductCategory.findByPk(id);
        
        await getProductCategory.destroy()

        return new HttpResponse(200, 'categoria eliminada');
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message)
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
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_PRODUCT_CATEGORY']);
      if (validatePermission) {
        
        const validateid = await ProductCategoryValidation.getProductCategory(id);
        
        if (validateid.error) {
          throw new HttpResponse(400, validateid.error)
        }
  
        const user = await getUser(bearerHeader);

        const validateName = await ProductCategory.findOne({
          where: {
            name: body.name
          }
        })
        if (validateName) {
          return new HttpResponse(400, 'el nombre ya está en uso');
        }

        const newProductCategory = await ProductCategory.update(
          {
            name: body.name,
            description: body.description,
            isActive: body.isActive,
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'categoria actualizada');
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message);      
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_PRODUCT_CATEGORY']);
      if (validatePermission) {
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM productCategorys WHERE name LIKE '%${wherecond}%' AND isActive = ${isActive} OR description LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const productCategorys = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, productCategorys)
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },
}

module.exports = ProductCategoryService;