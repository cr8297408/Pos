const db = require('../../config/connection/connectBd');
const UserSectionValidation = require('./validation');
const UserSection = require('./model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions')
const getUser = require('../../middlewares/getUser');
const HttpResponse = require('../../response');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {UserSection} model
 */
const UserSectionService = {
  /**
   * @exports
   * @implements {UserSection} model
   * @description get all UserSections 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_USER_SECTION'])
      if (validatePermission) {
        const UserSections = await UserSection.findAll()
        return new HttpResponse(200, UserSections);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch(error) {
      throw new HttpResponse(400, error.message)
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {UserSection} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_USER_SECTION']);
      if (validatePermission) {
        const validate = UserSectionValidation.createUserSection(body);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const user = await getUser(bearerHeader);
        const createUserSection = await UserSection.create({
          ip: body.ip,
          region: body.region,
          country: body.country,
          city: body.city,
          token: body.token,
          isActive: body.isActive, 
          createdBy: user.id
        });
        return new HttpResponse(201, createUserSection);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
      
    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @implements {UserSection} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_USER_SECTION'])
      if (validatePermission) {
        const validate = UserSectionValidation.getUserSection(id);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const getUserSection = await UserSection.findByPk(id)
        return new HttpResponse(200, getUserSection);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {UserSection} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_USER_SECTION']);
      if (validatePermission) {
        const validate = await UserSectionValidation.getUserSection(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getUserSection = await UserSection.findByPk(id);
        
        await getUserSection.destroy()

        return new HttpResponse(200, getUserSection);
        
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
   * @description update a UserSection in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_USER_SECTION'])
      if (validatePermission) {
        
        const validateid = await UserSectionValidation.getUserSection(id);
        
        if (validateid.error) {
          throw new HttpResponse(400, validateid.error);
        }
  
        const user = await getUser(bearerHeader);
        const newUserSection = await UserSection.update(
          {
            ip: body.ip,
            region: body.region,
            country: body.country,
            city: body.city,
            token: body.token,
            isActive: body.isActive,
            updatedBy: user.id 
          },
          {where: {id}}
        )
  
        return new HttpResponse(400, 'sección actualizada');
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(200, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_USER_SECTION']);
      if (validatePermission) {
        
        let query = `SELECT * FROM userSections WHERE ip LIKE '%${wherecond}%' AND isActive = ${isActive} OR region LIKE '%${wherecond}%' AND isActive = ${isActive} OR country LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const userSections = await Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, userSections);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
        throw new HttpResponse(400, error.message);
    }
  },
}

module.exports = UserSectionService;