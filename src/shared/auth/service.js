const Auth = require('./model');
const db = require('../../config/connection/connectBD');
const AuthValidation = require('./validation');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {Auth} model
 */
const AuthService = {
  /**
   * @exports
   * @param {*} body
   * @implements {Auth} model 
   */
  async create(body) {
    try {
      const validate = AuthValidation.createAuth(body);
      if (validate.error) {
        throw new Error(validate.error)
      }

      const createdAuth = await Auth.create(body);
      return createdAuth;

    } catch (error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @implements {Auth} model
   */

   async findOne(id){
    try {
      const validate = AuthValidation.getAuth(id);
      if (validate.error) {
        throw new Error(validate.error)
      }
      const getsAuth = await Auth.findByPk(id)
      return getsAuth;


    } catch (error) {
      throw new Error(error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {Auth} model
   */
  async delete(id){
    try {
      const validate = await AuthValidation.getAuth(id)

      if (validate.error) {
        throw new Error(validate.error)
      }

      const getsAuth = await Auth.findByPk(id);
      
      await getsAuth.destroy()

      return getsAuth;
      

    } catch (error) {
      throw new Error(error)
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a Auth in the db
   */
  async update(id, body){
    try {
      const validateid = await AuthValidation.getAuth(id);
      
      if (validateid.error) {
        throw new Error(validate.error)
      }

      const validateBody = await AuthValidation.createAuth(body)
      if (validateBody.error) {
        throw new Error(validate.error)
      }
      const newAuth = await Auth.update(
        {
          name: body.name,
          accountingAccount: body.accountingAccount 
        },
        {where: {id}}
      )

      return newAuth;
    } catch (error) {
      
    }
  }

}

module.exports = AuthService;