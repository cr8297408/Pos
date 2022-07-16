const db = require('../../config/connection/connectBD');
const BankValidation = require('./validation');
const Bank = require('./model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions')
const getUser = require('../../shared/middlewares/getUser');


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
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const Banks = await Bank.findAll()
        return Banks;
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
   * @implements {Bank} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = BankValidation.createBank(body);
        if (validate.error) {
          throw new Error(validate.error)
        }

        const user = await getUser(bearerHeader);

        const existsBank = await Bank.findOne({
          where: {
            name: body.name
          }
        })
        
        const existsAccount = await Bank.findOne({
          where: {
            accountingAccount: body.accountingAccount
          }
        })
        
        if(existsBank || existsAccount){
          throw new Error('el nombre del banco y el numero de cuenta deben ser unicos, revisa si ya está registrado este banco')
        }
        if(existsBank){
          throw new Error('el nombre está en uso.')
        }
        
        const createBank = await Bank.create({
          name: body.name,
          accountingAccount: body.accountingAccount,
          createdBy: user.id 
        });
        return createBank;
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
   * @implements {Bank} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = BankValidation.getBank(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getbank = await Bank.findByPk(id)
        return getbank;
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
   * @implements {Bank} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await BankValidation.getBank(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getbank = await Bank.findByPk(id);
        
        await getbank.destroy()

        return getbank;
        
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
   * @description update a bank in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await BankValidation.getBank(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await BankValidation.createBank(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }

        const user = await getUser(bearerHeader);

        const newBank = await Bank.update(
          {
            name: body.name,
            accountingAccount: body.accountingAccount,
            updatedBy: user.id 
          },
          {where: {id}}
        )
  
        return newBank;
        
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
        const banks = await Pagination('banks',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return banks
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

module.exports = BankService;