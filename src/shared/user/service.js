const User = require('./model');
const db = require('../../config/connection/connectBD');
const UserValidation = require('./validation');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {User} model
 */
const UserService = {
  async findAll(){
    try {
      const Users = await User.findAll()
      return Users;
    } catch(error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @param {*} body
   * @implements {User} model 
   */
  async create(body) {
    try {
      const validate = UserValidation.createUser(body);
      if (validate.error) {
        throw new Error(validate.error)
      }
      
      const existsMail = await User.findOne({
        where: {
          email:body.email,
        }
      })
      const existsUser = await User.findOne({
        where: {
          username:body.username,
        }
      })

      if (existsMail) {
        return {
          status: 400,
          message: 'el email ya está en uso '
        }
      }
      if (existsUser) {
        return {
          status: 400,
          message: 'el usuario ya está en uso '
        }
      }

      const createdUser = await User.create(body);
      return createdUser;

    } catch (error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @implements {User} model
   */

   async findOne(id){
    try {
      const validate = UserValidation.getUser(id);
      if (validate.error) {
        throw new Error(validate.error)
      }
      const getsUser = await User.findByPk(id)
      return getsUser;


    } catch (error) {
      throw new Error(error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {User} model
   */
  async delete(id){
    try {
      const validate = await UserValidation.getUser(id)

      if (validate.error) {
        throw new Error(validate.error)
      }

      const newUser = await User.update(
        {
          isActive: false
        },
        {where: {id}}
      )

      return getUser;
      

    } catch (error) {
      throw new Error(error)
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a User in the db
   */
  async update(id, body){
    try {
      const validateid = await UserValidation.getUser(id);
      
      if (validateid.error) {
        throw new Error(validate.error)
      }

      const validateBody = await UserValidation.createUser(body)
      if (validateBody.error) {
        throw new Error(validate.error)
      }
      const newUser = await User.update(
        {
          username: body.username,
          email:body.email,
          firstName: body.firstName,
          lastName: body.lastName,
          roles: body.roles,
          profile: body.profile,
          isActive: body.isActive,
          isAdmin: body.isAdmin,
          avatarFile: body.avatarFile,
        },
        {where: {id}}
      )

      return newUser;
    } catch (error) {
      
    }
  }

}

module.exports = UserService;