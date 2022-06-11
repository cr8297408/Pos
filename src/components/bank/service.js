const db = require('../../config/connection/connectBD');
const BankValidation = require('./validation');
const Bank = require('./model');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {Bank} model
 */
const BankService = {
  /**
   * @exports
   * @implements {Bank} model
   * @description get all banks 
   */
  async findAll(){
    try {
      const Banks = await Bank.findAll()
      return Banks;
    } catch(error) {
      throw new Error(error.message)
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {Bank} model 
   */
  async create(body) {
    try {
      const validate = BankValidation.createBank(body);
      if (validate.error) {
        throw new Error(validate.error)
      }

      const createBank = await Bank.create(body);
      return createBank;
      
    } catch (error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @implements {Bank} model
   */

  async findOne(id){
    try {
      const validate = BankValidation.getBank(id);
      if (validate.error) {
        throw new Error(validate.error)
      }
      const getbank = await Bank.findByPk(id)
      return getbank;


    } catch (error) {
      throw new Error(error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {Bank} model
   */
  async delete(id){
    try {
      const validate = await BankValidation.getBank(id)

      if (validate.error) {
        throw new Error(validate.error)
      }

      const getbank = await Bank.findByPk(id);
      
      await getbank.destroy()

      return getbank;
      

    } catch (error) {
      throw new Error(error)
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a bank in the db
   */
  async update(id, body){
    try {
      const validateid = await BankValidation.getBank(id);
      
      if (validateid.error) {
        throw new Error(validate.error)
      }

      const validateBody = await BankValidation.createBank(body)
      if (validateBody.error) {
        throw new Error(validate.error)
      }
      const newBank = await Bank.update(
        {
          name: body.name,
          accountingAccount: body.accountingAccount 
        },
        {where: {id}}
      )

      return newBank;
    } catch (error) {
      
    }
  }


}

module.exports = BankService;