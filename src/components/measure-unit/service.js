const MeasureUnit = require('./model');
const db = require('../../config/connection/connectBD');
const MeasureUnitValidation = require('./validation');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {MeasureUnit} model
 */
const MeasureUnitService = {
  async findAll(){
    try {
      const MeasureUnits = await MeasureUnit.findAll()
      return MeasureUnits;
    } catch(error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @param {*} body
   * @implements {MeasureUnit} model 
   */
  async create(body) {
    try {
      const validate = MeasureUnitValidation.createMeasureUnit(body);
      if (validate.error) {
        throw new Error(validate.error)
      }

      const createMeasureUnit = await MeasureUnit.create(body);
      return createMeasureUnit;

    } catch (error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @implements {MeasureUnit} model
   */

   async findOne(id){
    try {
      const validate = MeasureUnitValidation.getMeasureUnit(id);
      if (validate.error) {
        throw new Error(validate.error)
      }
      const getMeasureUnit = await MeasureUnit.findByPk(id)
      return getMeasureUnit;


    } catch (error) {
      throw new Error(error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {MeasureUnit} model
   */
  async delete(id){
    try {
      const validate = await MeasureUnitValidation.getMeasureUnit(id)

      if (validate.error) {
        throw new Error(validate.error)
      }

      const getMeasureUnit = await MeasureUnit.findByPk(id);
      
      await getMeasureUnit.destroy()

      return getMeasureUnit;
      

    } catch (error) {
      throw new Error(error)
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a MeasureUnit in the db
   */
  async update(id, body){
    try {
      const validateid = await MeasureUnitValidation.getMeasureUnit(id);
      
      if (validateid.error) {
        throw new Error(validate.error)
      }

      const validateBody = await MeasureUnitValidation.createMeasureUnit(body)
      if (validateBody.error) {
        throw new Error(validate.error)
      }
      const newMeasureUnit = await MeasureUnit.update(
        {
          name: body.name,
        },
        {where: {id}}
      )

      return newMeasureUnit;
    } catch (error) {
      
    }
  }

}

module.exports = MeasureUnitService;