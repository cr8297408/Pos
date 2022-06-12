const __name__ = require('./model');
const db = require('../../config/connection/connectBD');
const __name__Validation = require('./validation');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {__name__} model
 */
const __name__Service = {
  async findAll(){
    try {
      const __name__s = await __name__.findAll()
      return __name__s;
    } catch(error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @param {*} body
   * @implements {__name__} model 
   */
  async create(body) {
    try {
      const validate = __name__Validation.create__name__(body);
      if (validate.error) {
        throw new Error(validate.error)
      }

      const created__name__ = await __name__.create(body);
      return created__name__;

    } catch (error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @implements {__name__} model
   */

   async findOne(id){
    try {
      const validate = __name__Validation.get__name__(id);
      if (validate.error) {
        throw new Error(validate.error)
      }
      const gets__name__ = await __name__.findByPk(id)
      return gets__name__;


    } catch (error) {
      throw new Error(error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {__name__} model
   */
  async delete(id){
    try {
      const validate = await __name__Validation.get__name__(id)

      if (validate.error) {
        throw new Error(validate.error)
      }

      const gets__name__ = await __name__.findByPk(id);
      
      await gets__name__.destroy()

      return gets__name__;
      

    } catch (error) {
      throw new Error(error)
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a __name__ in the db
   */
  async update(id, body){
    try {
      const validateid = await __name__Validation.get__name__(id);
      
      if (validateid.error) {
        throw new Error(validate.error)
      }

      const validateBody = await __name__Validation.create__name__(body)
      if (validateBody.error) {
        throw new Error(validate.error)
      }
      const new__name__ = await __name__.update(
        {
          name: body.name,
          accountingAccount: body.accountingAccount 
        },
        {where: {id}}
      )

      return new__name__;
    } catch (error) {
      
    }
  }

}

module.exports = __name__Service;