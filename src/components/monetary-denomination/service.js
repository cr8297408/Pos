const MonetaryDenomination = require('./model');
const db = require('../../config/connection/connectBD');
const MonetaryDenominationValidation = require('./validation');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {MonetaryDenomination} model
 */
const MonetaryDenominationService = {
  async findAll(){
    try {
      const MonetaryDenominations = await MonetaryDenomination.findAll()
      return MonetaryDenominations;
    } catch(error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @param {*} body
   * @implements {MonetaryDenomination} model 
   */
  async create(body) {
    try {
      const validate = MonetaryDenominationValidation.createMonetaryDenomination(body);
      if (validate.error) {
        throw new Error(validate.error)
      }

      const createMonetaryDenomination = await MonetaryDenomination.create(body);
      return createMonetaryDenomination;

    } catch (error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @implements {MonetaryDenomination} model
   */

   async findOne(id){
    try {
      const validate = MonetaryDenominationValidation.getMonetaryDenomination(id);
      if (validate.error) {
        throw new Error(validate.error)
      }
      const getMonetaryDenomination = await MonetaryDenomination.findByPk(id)
      return getMonetaryDenomination;


    } catch (error) {
      throw new Error(error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {MonetaryDenomination} model
   */
  async delete(id){
    try {
      const validate = await MonetaryDenominationValidation.getMonetaryDenomination(id)

      if (validate.error) {
        throw new Error(validate.error)
      }

      const getMonetaryDenomination = await MonetaryDenomination.findByPk(id);
      
      await getMonetaryDenomination.destroy()

      return getMonetaryDenomination;
      

    } catch (error) {
      throw new Error(error)
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a MonetaryDenomination in the db
   */
  async update(id, body){
    try {
      const validateid = await MonetaryDenominationValidation.getMonetaryDenomination(id);
      
      if (validateid.error) {
        throw new Error(validate.error)
      }

      const validateBody = await MonetaryDenominationValidation.createMonetaryDenomination(body)
      if (validateBody.error) {
        throw new Error(validate.error)
      }
      const newMonetaryDenomination = await MonetaryDenomination.update(
        {
          photoFile: body.photoFile,
          value: body.value,
          monetaryDenominationTypes: body.monetaryDenominationTypes 
        },
        {where: {id}}
      )

      return newMonetaryDenomination;
    } catch (error) {
      
    }
  }

}

module.exports = MonetaryDenominationService;