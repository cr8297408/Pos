const Tax = require('./model');
const db = require('../../config/connection/connectBD');
const TaxValidation = require('./validation');
const permissions = require('../../shared/middlewares/permissions');
const Pagination = require('../../shared/middlewares/pagination')

sequelize = db.sequelize;

/**
 * @exports
 * @implements {Tax} model
 */
const TaxService = {
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) { 
        const Taxs = await Tax.findAll()
        return Taxs;
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
   * @implements {Tax} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) { 
        const validate = TaxValidation.createTax(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const createTax = await Tax.create(body);
        return createTax;
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
   * @implements {Tax} model
   */

   async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) { 
        const validate = TaxValidation.getTax(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getTax = await Tax.findByPk(id)
        return getTax;
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
   * @implements {Tax} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) { 
        const validate = await TaxValidation.getTax(id)
  
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const getTax = await Tax.findByPk(id);
        
        await getTax.destroy()
  
        return getTax;
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
   * @description update a Tax in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) { 
        const validateid = await TaxValidation.getTax(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await TaxValidation.createTax(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const newTax = await Tax.update(
          {
            name: body.name,
            description:body.description,
            tax: body.tax,
            taxType: body.taxType,
            isActive: body.isActive, 
          },
          {where: {id}}
        )
  
        return newTax;
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber,where){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_PAGINATION')
      if (validatePermission) {
        const taxs = await Pagination('taxes',sequelize,sizeAsNumber, pageAsNumber,where)
        return taxs
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

module.exports = TaxService;