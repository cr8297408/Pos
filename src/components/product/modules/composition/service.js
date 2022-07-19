const db = require('../../../../config/connection/connectBd');
const CompositionValidation = require('./validation');
const Composition = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination')
const permissions = require('../../../../shared/middlewares/permissions');
const Product = require('../../model');
const getUser = require('../../../../shared/middlewares/getUser');
const HttpResponse = require('../../../../shared/response');


sequelize = db.sequelize;

/**
 * @exports
 * @implements {Composition} model
 */
const CompositionService = {
  /**
   * @exports
   * @implements {Composition} model
   * @description get all Compositions 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_COMPOSITION'])
      if (validatePermission) {
        const Compositions = await Composition.findAll()
        return new HttpResponse(200, Compositions);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch(error) {
      throw new HttpResponse(error.message)
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {Composition} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_COMPOSITION']);
      if (validatePermission) {
        const validate = CompositionValidation.createComposition(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
        let jsonP = body.supplies

        /**
         * validar que todos los supplies del compuesto sean productos registrados 
         */
        for (let i = 0; i < jsonP.length; i++) {
          let productoVal = await Product.findByPk(jsonP[i])
          if (!productoVal) {
            throw new HttpResponse(400, 'los supplies deben de ser productos validos...')
          }
        }
        const user = await getUser(bearerHeader);
        const validateName = await Composition.findOne({
          where: {
            name: body.name
          }
        })
        if (validateName) {
          return new HttpResponse(400, 'el nombre ya está en uso');
        }
        const createComposition = await Composition.create({
          name: body.name,
          description: body.description,
          ProductId: body.ProductId,
          supplies: body.supplies,
          portion: body.portion,
          isActive: body.isActive,
          createdBy: user.id
        });
        return new HttpResponse(201, createComposition);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
      
    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @implements {Composition} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_COMPOSITION'])
      if (validatePermission) {
        const validate = CompositionValidation.getComposition(id);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const getComposition = await Composition.findByPk(id)
        return new HttpResponse(200, getComposition);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {Composition} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_COMPOSITION'])
      if (validatePermission) {
        const validate = await CompositionValidation.getComposition(id)

        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }

        const getComposition = await Composition.findByPk(id);
        
        await getComposition.destroy()

        return new HttpResponse(200, 'composicion eliminada');
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a Composition in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_COMPOSITION'])
      if (validatePermission) {
        
        const validateid = await CompositionValidation.getComposition(id);
        
        if (validateid.error) {
          throw new HttpResponse(400, validateid.error)
        }
  
        const user = await getUser(bearerHeader);

        const validateName = await Composition.findOne({
          where: {
            name: body.name
          }
        })
        if (validateName) {
          return new HttpResponse(400, 'el nombre ya está en uso');
        }

        const newComposition = await Composition.update(
          {
            name: body.name,
            description: body.description,
            ProductId: body.ProductId,
            supplies: body.supplies,
            portion: body.portion,
            isActive: body.isActive,
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return newComposition;
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_COMPOSITION'])
      if (validatePermission) {
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM compositions WHERE name LIKE '%${wherecond}%' AND isActive = ${isActive} OR description LIKE '%${wherecond}%' AND isActive = ${isActive} OR supplies LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const compositions = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, compositions)
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
        throw new HttpResponse(400, error.message);
    }
  },
}

module.exports = CompositionService;