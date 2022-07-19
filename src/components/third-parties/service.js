const db = require('../../config/connection/connectBd');
const ThirdPartiesValidation = require('./validation');
const ThirdParties = require('./model');
const Pagination = require('../../shared/middlewares/pagination');
const permissions = require('../../shared/middlewares/permissions');
const getUser = require('../../shared/middlewares/getUser');
const HttpResponse = require('../../shared/response');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {ThirdParties} model
 */
const ThirdPartiesService = {
  /**
   * @exports
   * @implements {ThirdParties} model
   * @description get all ThirdPartiess 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_THIRD_PARTIE']);
      if (validatePermission) {
        const ThirdPartiess = await ThirdParties.findAll()
        return new HttpResponse(200, ThirdPartiess);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch(error) {
      throw new HttpResponse(400, error.message);
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {ThirdParties} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_THIRD_PARTIE']);
      if (validatePermission) {
        const validate = ThirdPartiesValidation.createThirdParties(body);
        if (validate.error) {
          throw new HttpResponse(validate.error);
        }
        
        const validateName = await ThirdParties.findOne({
          where: {
            name: body.name
          }
        })
        if (validateName) {
          return new HttpResponse(400, 'el nombre ya está en uso');
        }
        
        const user = await getUser(bearerHeader);

        const createThirdParties = await ThirdParties.create({
          name: body.name,
          description: body.description,
          isActive: body.isActive,
          createdBy: user.id
        });
        return new HttpResponse(201, createThirdParties);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')
      
    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @implements {ThirdParties} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_THIRD_PARTIE']);
      if (validatePermission) {
        const validate = ThirdPartiesValidation.getThirdParties(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getThirdParties = await ThirdParties.findByPk(id)
        return new HttpResponse(200, getThirdParties);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {ThirdParties} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_THIRD_PARTIE']);
      if (validatePermission) {
        const validate = await ThirdPartiesValidation.getThirdParties(id)

        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }

        const getThirdParties = await ThirdParties.findByPk(id);
        
        await getThirdParties.destroy()

        return new HttpResponse(200, 'tercero eliminado');
        
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
   * @description update a ThirdParties in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_THIRD_PARTIE']);
      if (validatePermission) {
        
        const validateid = await ThirdPartiesValidation.getThirdParties(id);
        
        if (validateid.error) {
          throw new HttpResponse(400, validate.error);
        }
  
        const validateBody = await ThirdPartiesValidation.createThirdParties(body)
        if (validateBody.error) {
          throw new HttpResponse(400, validate.error)
        }

        const validateName = await ThirdParties.findOne({
          where: {
            name: body.name
          }
        })
        if (validateName) {
          return new HttpResponse(400, 'el nombre ya está en uso');
        }

        const user = await getUser(bearerHeader);

        const newThirdParties = await ThirdParties.update(
          {
            name: body.name,
            description: body.description,
            isActive: body.isActive,
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return newThirdParties;
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message);      
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_THIRD_PARTIE']);
      if (validatePermission) {
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM thirdParties WHERE name LIKE '%${wherecond}%' AND isActive = ${isActive} OR description LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const thirdParties = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, thirdParties);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },
}

module.exports = ThirdPartiesService;