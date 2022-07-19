const db = require('../../config/connection/connectBD');
const BankValidation = require('./validation');
const Bank = require('./model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions')
const getUser = require('../../shared/middlewares/getUser');
const HttpResponse = require('../../shared/response');


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
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_BANK'])
      if (validatePermission) {
        const Banks = await Bank.findAll()
        return new HttpResponse(200, Banks);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch(error) {
      throw new HttpResponse(400,error.message)
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {Bank} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_BANK'])
      if (validatePermission) {
        const validate = BankValidation.createBank(body);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
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
          throw new HttpResponse(400,'el nombre del banco y el numero de cuenta deben ser unicos, revisa si ya está registrado este banco')
        }
        if(existsBank){
          throw new HttpResponse(400,'el nombre está en uso.')
        }
        
        const createBank = await Bank.create({
          name: body.name,
          accountingAccount: body.accountingAccount,
          isActive: body.isActive,
          createdBy: user.id 
        });
        return new HttpResponse(201, createBank);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')
      
    } catch (error) {
      throw new HttpResponse(400,error)
    }
  },

  /**
   * @exports
   * @implements {Bank} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_BANK'])
      if (validatePermission) {
        const validate = BankValidation.getBank(id);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const getbank = await Bank.findByPk(id)
        return new HttpResponse(200, getbank);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')
    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {Bank} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_BANK'])
      if (validatePermission) {
        const validate = await BankValidation.getBank(id)

        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }

        const getbank = await Bank.findByPk(id);
        
        await getbank.destroy()

        return new HttpResponse(200, 'banco eliminado.');
        
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
   * @description update a bank in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_BANK'])
      if (validatePermission) {
        
        const validateid = await BankValidation.getBank(id);
        
        if (validateid.error) {
          throw new HttpResponse(400, validate.error)
        }

        const user = await getUser(bearerHeader);

        if(body.name || body.accountingAccount){
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
            throw new HttpResponse(400,'el nombre del banco y el numero de cuenta deben ser unicos, revisa si ya está registrado este banco')
          }
        }

        const newBank = await Bank.update(
          {
            name: body.name,
            accountingAccount: body.accountingAccount,
            isActive: body.isActive,
            updatedBy: user.id 
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'banco actualizado.');
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_BANK'])
      if (validatePermission) {

        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM banks WHERE name LIKE '%${wherecond}%' AND isActive = ${isActive} OR accountingAccount LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const banks = await Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, banks)
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },
}

module.exports = BankService;