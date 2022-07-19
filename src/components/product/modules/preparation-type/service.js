const db = require('../../../../config/connection/connectBd');
const PreparationTypeValidation = require('./validation');
const PreparationType = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination');
const permissions = require('../../../../shared/middlewares/permissions');
const getUser = require('../../../../shared/middlewares/getUser');
const HttpResponse = require('../../../../shared/response');


sequelize = db.sequelize;

/**
 * @exports
 * @implements {PreparationType} model
 */
const PreparationTypeService = {
  /**
   * @exports
   * @implements {PreparationType} model
   * @description get all PreparationTypes 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_PREPARATION_TYPE'])
      if (validatePermission) {
        const PreparationTypes = await PreparationType.findAll()
        return new HttpResponse(200, PreparationTypes);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch(error) {
      throw new HttpResponse(400, error.message)
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {PreparationType} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_PREPARATION_TYPE'])
      if (validatePermission) {
        const validate = PreparationTypeValidation.createPreparationType(body);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const user = await getUser(bearerHeader);

        
        const validateName = await PreparationType.findOne({
          where: {
            name: body.name
          }
        })
        if (validateName) {
          return new HttpResponse(400, 'el nombre ya está en uso');
        }
        

        const createPreparationType = await PreparationType.create({
          name: body.name,
          description: body.description,
          PreparationId: body.PreparationId,
          isActive: body.isActive,
          createdBy: user.id
        });
        return new HttpResponse(201, createPreparationType);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
      
    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @implements {PreparationType} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_PREPARATION_TYPE']);
      if (validatePermission) {
        const validate = PreparationTypeValidation.getPreparationType(id);
        if (validate.error) {
          throw new HttpResponse(400, validate.error);
        }
        const getPreparationType = await PreparationType.findByPk(id)
        return new HttpResponse(200, getPreparationType);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {PreparationType} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_PREPARATION_TYPE'])
      if (validatePermission) {
        const validate = await PreparationTypeValidation.getPreparationType(id)

        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }

        const getPreparationType = await PreparationType.findByPk(id);
        
        await getPreparationType.destroy()

        return new HttpResponse(200, 'tipo de preparación eliminado');
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a PreparationType in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_PREPARATION_TYPE'])
      if (validatePermission) {
        
        const validateid = await PreparationTypeValidation.getPreparationType(id);
        
        if (validateid.error) {
          throw new HttpResponse(400, validateid.error)
        }
  
        const user = await getUser(bearerHeader);
        const newPreparationType = await PreparationType.update(
          {
            name: body.name,
            description: body.description,
            PreparationId: body.PreparationId,
            isActive: body.isActive,
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'tipo de preparación actualizado');
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_PREPARATION_TYPE'])
      if (validatePermission) {
        
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM reportTypes WHERE name LIKE '%${wherecond}%' AND isActive = ${isActive} OR description LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const reportTypes = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, reportTypes)
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
        throw new HttpResponse(400, error.message);
    }
  },
}

module.exports = PreparationTypeService;