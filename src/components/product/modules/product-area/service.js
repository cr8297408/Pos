const ProductArea = require('./model');
const db = require('../../../../config/connection/connectBD');
const ProductAreaValidation = require('./validation');
const Pagination = require('../../../../shared/middlewares/pagination');
const permissions = require('../../../../shared/middlewares/permissions');
const getUser = require('../../../../shared/middlewares/getUser');
const HttpResponse = require('../../../../shared/response');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {ProductArea} model
 */
const ProductAreaService = {
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_PRODUCT_AREA'])
      if (validatePermission) {
        const ProductAreas = await ProductArea.findAll()
        return new HttpResponse(200, ProductAreas);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')
    } catch(error) {
      throw new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @param {*} body
   * @implements {ProductArea} model 
   */
  async create(bearerHeader ,body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_PRODUCT_AREA'])
      if (validatePermission) {
        const validate = ProductAreaValidation.createProductArea(body);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
  
        const validateName = await ProductArea.findOne({
          where: {
            name: body.name
          }
        })
        if (validateName) {
          throw new HttpResponse(400, 'el nombre está en uso')
        }
        const user = await getUser(bearerHeader);
        const createProductArea = await ProductArea.create({
          name: body.name,
          attentionArea: body.attentionArea,
          description: body.description,
          isActive: body.isActive,
          createdBy: user.id
        });
        return new HttpResponse(201, createProductArea);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @implements {ProductArea} model
   */

   async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) { 
        const validate = ProductAreaValidation.getProductArea(id);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const getProductArea = await ProductArea.findByPk(id)
        return new HttpResponse(200, getProductArea);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {ProductArea} model
   */
  async delete(bearerHeader ,id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_PRODUCT_AREA']);
      if (validatePermission) { 
        const validate = await ProductAreaValidation.getProductArea(id)
  
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
  
        const getProductArea = await ProductArea.findByPk(id);
        
        await getProductArea.destroy()
  
        return new HttpResponse(200, 'area del producto eliminada');
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
   * @description update a ProductArea in the db
   */
  async update(bearerHeader ,id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_PRODUCT_AREA'])
      if (validatePermission) { 
        const validateid = await ProductAreaValidation.getProductArea(id);
        
        if (validateid.error) {
          throw new HttpResponse(400, validateid.error)
        }
  
        const validateName = await ProductArea.findOne({
          where: {
            name: body.name
          }
        })
        if (validateName) {
          throw new HttpResponse(400, 'el nombre está en uso')
        }
        const user = await getUser(bearerHeader);
        const newProductArea = await ProductArea.update(
          {
            name: body.name,
            attentionArea: body.attentionArea,
            description: body.description,
            isActive: body.isActive,
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'area del producto actualizada');
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message);      
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber,wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader,['FIND_PAGINATION', 'FIND_PAGINATION_PRODUCT_AREA'])
      if (validatePermission) {
        
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM productAreas WHERE name LIKE '%${wherecond}%' AND isActive = ${isActive} OR description LIKE '%${wherecond}%' AND isActive = ${isActive} OR attentionArea LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const productAreas = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, productAreas)
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

module.exports = ProductAreaService;