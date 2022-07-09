const db = require('../../config/connection/connectBd');
const UserSectionValidation = require('./validation');
const UserSection = require('./model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions')
const getUser = require('../../middlewares/getUser');

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
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const UserSections = await UserSection.findAll()
        return UserSections;
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
   * @implements {UserSection} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = UserSectionValidation.createUserSection(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const user = await getUser(bearerHeader);
        const createUserSection = await UserSection.create({
          name: body.name,
          description: body.description, 
          createdBy: user.id
        });
        return createUserSection;
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
   * @implements {UserSection} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = UserSectionValidation.getUserSection(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getUserSection = await UserSection.findByPk(id)
        return getUserSection;
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
   * @implements {UserSection} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await UserSectionValidation.getUserSection(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getUserSection = await UserSection.findByPk(id);
        
        await getUserSection.destroy()

        return getUserSection;
        
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
   * @description update a UserSection in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await UserSectionValidation.getUserSection(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await UserSectionValidation.createUserSection(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const user = await getUser(bearerHeader);
        const newUserSection = await UserSection.update(
          {
            name: body.name,
            description: body.description,
            updatedBy: user.id 
          },
          {where: {id}}
        )
  
        return newUserSection;
        
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
        const UserSections = await Pagination('UserSections',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return UserSections
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

module.exports = UserSectionService;