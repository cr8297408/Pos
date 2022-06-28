const db = require('../../../../config/connection/connectBd');
const CompositionValidation = require('./validation');
const Composition = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination')
const permissions = require('../../../../shared/middlewares/permissions');
const Product = require('../../model');

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
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const Compositions = await Composition.findAll()
        return Compositions;
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
   * @implements {Composition} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
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
          if (!productVal) {
            throw new Error('los supplies deben de ser productos validos...')
          }
        }
  
        const createComposition = await Composition.create({
          name: body.name,
          description: body.description,
          ProductId: body.ProductId,
          supplies: body.supplies,
          portion: body.portion
        });
        return createComposition;
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
   * @implements {Composition} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = CompositionValidation.getComposition(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getComposition = await Composition.findByPk(id)
        return getComposition;
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
   * @implements {Composition} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await CompositionValidation.getComposition(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getComposition = await Composition.findByPk(id);
        
        await getComposition.destroy()

        return getComposition;
        
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
   * @description update a Composition in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await CompositionValidation.getComposition(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await CompositionValidation.createComposition(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const newComposition = await Composition.update(
          {
            name: body.name,
            description: body.description,
            ProductId: body.ProductId,
            supplies: body.supplies,
            portion: body.portion
          },
          {where: {id}}
        )
  
        return newComposition;
        
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
        const Compositions = await Pagination('Compositions',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return Compositions
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

module.exports = CompositionService;