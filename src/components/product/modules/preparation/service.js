const db = require('../../../../config/connection/connectBd');
const PreparationValidation = require('./validation');
const Preparation = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination');
const permissions = require('../../../../shared/middlewares/permissions');
const getUser = require('../../../../shared/middlewares/getUser');
const HttpResponse = require('../../../../shared/response');


sequelize = db.sequelize;

/**
 * @exports
 * @implements {Preparation} model
 */
const PreparationService = {
  /**
   * @exports
   * @implements {Preparation} model
   * @description get all Preparations 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_PREPARATION']);
      if (validatePermission) {
        const Preparations = await Preparation.findAll()
        return new HttpResponse(200, Preparations);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch(error) {
      throw new HttpResponse(400, error.message)
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {Preparation} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_PREPARATION'])
      if (validatePermission) {
        const validate = PreparationValidation.createPreparation(body);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const user = await getUser(bearerHeader);

        const validateName = await Preparation.findOne({
          where: {
            name: body.name
          }
        })
        if (validateName) {
          return new HttpResponse(400, 'el nombre ya está en uso');
        }

        const createPreparation = await Preparation.create({
          name: body.name,
          description: body.description,
          isActive: body.isActive,
          createdBy: user.id
        });
        return new HttpResponse(201, createPreparation);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
      
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {Preparation} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_PREPARATION']);
      if (validatePermission) {
        const validate = PreparationValidation.getPreparation(id);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const getPreparation = await Preparation.findByPk(id)
        return new HttpResponse(200, getPreparation);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {Preparation} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_PREPARATION']);
      if (validatePermission) {
        const validate = await PreparationValidation.getPreparation(id)

        if (validate.error) {
          throw new HttpResponse(validate.error)
        }

        const getPreparation = await Preparation.findByPk(id);
        
        await getPreparation.destroy()

        return new HttpResponse(200, 'preparacion eliminada');
        
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
   * @description update a Preparation in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_PREPARATION'])
      if (validatePermission) {
        
        const validateid = await PreparationValidation.getPreparation(id);
        
        if (validateid.error) {
          throw new HttpResponse(400, validateid.error)
        }
  
        const user = await getUser(bearerHeader);

        const validateName = await Preparation.findOne({
          where: {
            name: body.name
          }
        })
        if (validateName) {
          return new HttpResponse(400, 'el nombre ya está en uso');
        }

        const newPreparation = await Preparation.update(
          {
            name: body.name,
            description: body.description,
            isActive: body.isActive,
            updatedBy: user.id 
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'preparacion actualizada');
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_PREPARATION']);
      if (validatePermission) {
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM preparations WHERE name LIKE '%${wherecond}%' AND isActive = ${isActive} OR description LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const preparations = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, preparations)
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

module.exports = PreparationService;