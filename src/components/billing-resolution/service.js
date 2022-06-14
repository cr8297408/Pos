const BillingResolution = require('./model');
const db = require('../../config/connection/connectBD');
const BillingResolutionValidation = require('./validation');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {BillingResolution} model
 */
const BillingResolutionService = {
  async findAll(){
    try {
      const BillingResolutions = await BillingResolution.findAll()
      return BillingResolutions;
    } catch(error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @param {*} body
   * @implements {BillingResolution} model 
   */
  async create(body) {
    try {
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

    } catch (error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @implements {BillingResolution} model
   */

   async findOne(id){
    try {
      const validate = BillingResolutionValidation.getBillingResolution(id);
      if (validate.error) {
        throw new Error(validate.error)
      }
      const getBillingResolution = await BillingResolution.findByPk(id)
      return getBillingResolution;


    } catch (error) {
      throw new Error(error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {BillingResolution} model
   */
  async delete(id){
    try {
      const validate = await BillingResolutionValidation.getBillingResolution(id)

      if (validate.error) {
        throw new Error(validate.error)
      }

      const getBillingResolution = await BillingResolution.findByPk(id);
      
      await getBillingResolution.destroy()

      return getBillingResolution;
      

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
  async update(id, body){
    try {
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
    } catch (error) {
      
    }
  },

  async findPagination(sizeAsNumber, pageAsNumber){
    try {

        let page = 0;
        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0 ) {
            page = pageAsNumber - 1;
        }

        let size = 0;
        if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
            size = sizeAsNumber;
        }
        const banks = await Bank.findAll({
          limit: size,
          offset: size*page
        })
        return banks

    } catch (error) {
        throw new Error(error.message);
    }
  },

  async findPagination(sizeAsNumber, pageAsNumber, wherecond){
    try {
        let page = 0;
        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0 ) {
            page = pageAsNumber - 1;
        }

        let size = 0;
        if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
            size = sizeAsNumber;
        }
        const offset = page*size;
        const billingResolutions = await sequelize.query(`SELECT * FROM billingResolutions WHERE ${wherecond} LIMIT ${offset},${size}`)
        console.log(wherecond);
        return billingResolutions[0]

    } catch (error) {
        throw new Error(error.message);
    }
  },

}

module.exports = BillingResolutionService;