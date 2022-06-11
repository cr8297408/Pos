const Tax = require('./model');
const db = require('../../config/connection/connectBD');
const TaxValidation = require('./validation');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {Tax} model
 */
const TaxService = {
  async findAll(){
    try {
      const Taxs = await Tax.findAll()
      return Taxs;
    } catch(error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @param {*} body
   * @implements {Tax} model 
   */
  async create(body) {
    try {
      const validate = TaxValidation.createTax(body);
      if (validate.error) {
        throw new Error(validate.error)
      }

      const createTax = await Tax.create(body);
      return createTax;

    } catch (error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @implements {Tax} model
   */

   async findOne(id){
    try {
      const validate = TaxValidation.getTax(id);
      if (validate.error) {
        throw new Error(validate.error)
      }
      const getTax = await Tax.findByPk(id)
      return getTax;


    } catch (error) {
      throw new Error(error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {Tax} model
   */
  async delete(id){
    try {
      const validate = await TaxValidation.getTax(id)

      if (validate.error) {
        throw new Error(validate.error)
      }

      const getTax = await Tax.findByPk(id);
      
      await getTax.destroy()

      return getTax;
      

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
  async update(id, body){
    try {
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
    } catch (error) {
      
    }
  }

}

module.exports = TaxService;