const db = require('../../../../config/connection/connectBd');
const ProductCurveValidation = require('./validation');
const ProductCurve = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination')
const permissions = require('../../../../shared/middlewares/permissions');
const HttpResponse = require('../../../../shared/response');
const getUser = require('../../../../shared/middlewares/getUser');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {ProductCurve} model
 */
const ProductCurveService = {
  /**
   * @exports
   * @implements {ProductCurve} model
   * @description get all ProductCurves 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_PRODUCT_CURVE'])
      if (validatePermission) {
        const ProductCurves = await ProductCurve.findAll()
        return new HttpResponse(200, ProductCurves);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch(error) {
      return new HttpResponse(400, error.message);
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {ProductCurve} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_PRODUCT_CURVE'])
      if (validatePermission) {
        const validate = ProductCurveValidation.createProductCurve(body);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const user = await getUser(bearerHeader);

        const existsProductCurve = await ProductCurve.findOne({
          where: {
            name: body.name
          }
        })
        if(existsProductCurve){
          return new HttpResponse(400, 'el nombre de ProductCurve ya está en uso')
        }
        
        const createProductCurve = await ProductCurve.create({
          ProductId: body.ProductId,
          name: body.name,
          description: body.description,
          code: body.code,
          ref: body.ref,
          isActive: body.isActive,
          createdBy: user.id
        });
        return new HttpResponse(201, createProductCurve);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {ProductCurve} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_PRODUCT_CURVE'])
      if (validatePermission) {
        const validate = ProductCurveValidation.getProductCurve(id);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const getProductCurve = await ProductCurve.findByPk(id);
        return new HttpResponse(200, getProductCurve);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {ProductCurve} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_PRODUCT_CURVE'])
      if (validatePermission) {
        const validate = await ProductCurveValidation.getProductCurve(id)

        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }

        const param = await ProductCurve.findByPk(id);

        await param.destroy();
  
        return new HttpResponse(200, 'ProductCurve eliminado');
        
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a ProductCurve in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_PRODUCT_CURVE'])
      if (validatePermission) {
        
        const validateid = await ProductCurveValidation.getProductCurve(id);
        
        if (validateid.error) {
          return new HttpResponse(400, validateid.error)
        }
        
        if(body.name){
          const existsProductCurve = await ProductCurve.findOne({
            where: {
              name: body.name
            }
          })
          if(existsProductCurve){
            return new HttpResponse(400, 'el nombre ya está en uso')
          }
        }
        const user = await getUser(bearerHeader)

        const newProductCurve = await ProductCurve.update(
          {
            name: body.name,
            description: body.description,
            code: body.code,
            ref: body.ref,
            isActive: body.isActive,
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'usuario modificado');
        
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_PRODUCT_CURVE'])
      if (validatePermission) {
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM ProductCurves WHERE name LIKE '%${wherecond}%' AND isActive = ${isActive} OR description LIKE '%${wherecond}%' AND isActive = ${isActive} OR code LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const ProductCurves = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, ProductCurves)
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
}

module.exports = ProductCurveService;