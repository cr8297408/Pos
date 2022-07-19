const BillingResolution = require('./model');
const db = require('../../config/connection/connectBD');
const BillingResolutionValidation = require('./validation');
const Pagination = require('../../shared/middlewares/pagination');
const permissions = require('../../shared/middlewares/permissions');
const getUser = require('../../shared/middlewares/getUser');
const HttpResponse = require('../../shared/response');


sequelize = db.sequelize;

/**
 * @exports
 * @implements {BillingResolution} model
 */
const BillingResolutionService = {
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_BILLING_RESOLUTION'])
      if (validatePermission) {
        const BillingResolutions = await BillingResolution.findAll()
        return new HttpResponse(200, BillingResolutions);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch(error) {
      throw new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @param {*} body
   * @implements {BillingResolution} model 
   */
  async create(bearerHeader,body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_BILLING_RESOLUTION'])
      if (validatePermission) {
        const validate = BillingResolutionValidation.createBillingResolution(body);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
  
        const exists_resolutionNumber = await BillingResolution.findOne({
          where:{
            resolutionNumber: body.resolutionNumber
          }
        })
  
        if (exists_resolutionNumber) {
          throw new HttpResponse(400, 'el numero de resolucion está en uso');
        }

        const user = await getUser(bearerHeader);
  
        const createBillingResolution = await BillingResolution.create({
          resolutionClass: body.resolutionClass,
          resolutionType: body.resolutionType,
          resolutionNumber: body.resolutionNumber,
          from: body.from,
          to: body.to,
          prefix: body.prefix,
          initialNumber: body.initialNumber,
          finalNumber: body.finalNumber,
          localBilling: body.localBilling,
          isActive: body.isActive,
          createdBy: user.id
        });
        return new HttpResponse(201, 'resolucion creada');
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {BillingResolution} model
   */

   async findOne(bearerHeader,id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_BILLING_RESOLUTION']);
      if (validatePermission) {
        const validate = BillingResolutionValidation.getBillingResolution(id);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const getBillingResolution = await BillingResolution.findByPk(id)
        return new HttpResponse(200, getBillingResolution);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {BillingResolution} model
   */
  async delete(bearerHeader,id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_BILLING_RESOLUTION']);
      if (validatePermission) {
        const validate = await BillingResolutionValidation.getBillingResolution(id)
  
        if (validate.error) {
          throw new HttpResponse(400, validate.error);
        }
  
        const getBillingResolution = await BillingResolution.findByPk(id);
        
        await getBillingResolution.destroy()
  
        return new HttpResponse(200, 'resolucion eliminada');
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
      

    } catch (error) {
      throw new HttpResponse(400, error.message)
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
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_BILLING_RESOLUTION'])
      if (validatePermission) {
        
        const validateid = await BillingResolutionValidation.getBillingResolution(id);
        
        if (validateid.error) {
          throw new HttpResponse(400, validate.error)
        }
        if(body.resolutionNumber){
          const exists_resolutionNumber = await BillingResolution.findOne({
            where:{
              resolutionNumber: body.resolutionNumber
            }
          })
    
          if (exists_resolutionNumber) {
            throw new HttpResponse(400, 'el numero de resolucion ya está en uso...')
          }
        }
        const user = await getUser(bearerHeader);
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
            localBilling: body.localBilling,
            isActive: body.isActive,
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'resolucion actualizada');
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

  async findPagination(bearerHeader,sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
        const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_BILLING_RESOLUTION']);
      if (validatePermission) {

        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM billingResolutions WHERE resolutionClass LIKE '%${wherecond}%' AND isActive = ${isActive} OR resolutionType LIKE '%${wherecond}%' AND isActive = ${isActive} OR resolutionNumber LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const billingResolutions = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, billingResolutions)
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
        throw new HttpResponse(400, error.message);
    }
  },

}

module.exports = BillingResolutionService;