const BillingResolution = require('./model');
const db = require('../../config/connection/connectBD');
const BillingResolutionValidation = require('./validation');
const Pagination = require('../../shared/middlewares/pagination');
const permissions = require('../../shared/middlewares/permissions')

sequelize = db.sequelize;

/**
 * @exports
 * @implements {BillingResolution} model
 */
const BillingResolutionService = {
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const BillingResolutions = await BillingResolution.findAll()
        return BillingResolutions;
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
   * @implements {BillingResolution} model 
   */
  async create(bearerHeader,body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = BillingResolutionValidation.createBillingResolution(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const exists_resolutionNumber = await BillingResolution.findOne({
          where:{
            resolutionNumber: body.resolutionNumber
          }
        })
  
        if (exists_resolutionNumber) {
          throw new Error('el numero de resolucion ya está en uso...')
        }
  
        const createBillingResolution = await BillingResolution.create(body);
        return createBillingResolution;
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
   * @implements {BillingResolution} model
   */

   async findOne(bearerHeader,id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = BillingResolutionValidation.getBillingResolution(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getBillingResolution = await BillingResolution.findByPk(id)
        return getBillingResolution;
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
   * @implements {BillingResolution} model
   */
  async delete(bearerHeader,id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await BillingResolutionValidation.getBillingResolution(id)
  
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const getBillingResolution = await BillingResolution.findByPk(id);
        
        await getBillingResolution.destroy()
  
        return getBillingResolution;
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
   * @description update a BillingResolution in the db
   */
  async update(bearerHeader,id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await BillingResolutionValidation.getBillingResolution(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await BillingResolutionValidation.createBillingResolution(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
  
        const exists_resolutionNumber = await BillingResolution.findOne({
          where:{
            resolutionNumber: body.resolutionNumber
          }
        })
  
        if (exists_resolutionNumber) {
          throw new Error('el numero de resolucion ya está en uso...')
        }
  
        const newBillingResolution = await BillingResolution.update(
          {
            resolutionClass: body.resolutionClass,
            resolutionType: body.resolutionType,
            resolutionNumber: body.resolutionNumber, 
            from: body.from,
            to:body.to,
            prefix: body.prefix,
            initialNumber: body.initialNumber,
            finalNumber: body.finalNumber,
            localBilling: body.localBilling
          },
          {where: {id}}
        )
  
        return newBillingResolution;
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      
    }
  },

  async findPagination(bearerHeader,sizeAsNumber, pageAsNumber, wherecond){
    try {
        const validatePermission = await permissions(bearerHeader, 'FIND_PAGINATION')
      if (validatePermission) {
        const billingResolutions = Pagination('billingResolutions', sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return billingResolutions
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

module.exports = BillingResolutionService;