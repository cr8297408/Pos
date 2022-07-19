const db = require('../../../../config/connection/connectBd');
const ProductGroupValidation = require('./validation');
const ProductGroup = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination');
const permissions = require('../../../../shared/middlewares/permissions');
const getUser = require('../../../../shared/middlewares/getUser');
const HttpResponse = require('../../../../shared/response');


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
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_PRODUCT_GROUP']);
      if (validatePermission) {
        const ProductGroups = await ProductGroup.findAll()
        return new HttpResponse(200, ProductGroups);
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
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_PRODUCT_GROUP']);
      if (validatePermission) {
        const validate = ProductGroupValidation.createProductGroup(body);
        if (validate.error) {
          throw new HttpResponse(400, validate.error);
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


        const createProductGroup = await ProductGroup.create({
          name: body.name,
          description: body.description,
          createdBy: user.id
        });
        return new HttpResponse(201, createProductGroup);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')
      
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
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_PRODUCT_GROUP']);
      if (validatePermission) {
        const validate = ProductGroupValidation.getProductGroup(id);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const getProductGroup = await ProductGroup.findByPk(id)
        return HttpResponse(200, getProductGroup);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {ProductGroup} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_PRODUCT_GROUP']);
      if (validatePermission) {
        const validate = await ProductGroupValidation.getProductGroup(id)

        if (validate.error) {
          throw new HttpResponse(400, validate.error);
        }

        const getProductGroup = await ProductGroup.findByPk(id);
        
        await getProductGroup.destroy()

        return new HttpResponse(200, 'grupo eliminado');
        
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
   * @description update a ProductGroup in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_PRODUCT_GROUP']);
      if (validatePermission) {
        
        const validateid = await ProductGroupValidation.getProductGroup(id);
        
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

        const newProductGroup = await ProductGroup.update(
          {
            name: body.name,
            description: body.description,
            isActive: body.isActive,
            updatedBy: user.id  
          },
          {where: {id}}
        )
  
        return newProductGroup;
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_PRODUCT_GROUP']);
      if (validatePermission) {
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM compositions WHERE name LIKE '%${wherecond}%' AND isActive = ${isActive} OR description LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const compositions = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, compositions)
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },
}

module.exports = ProductGroupService;