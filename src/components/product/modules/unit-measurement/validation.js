const Joi = require('joi');
const UnitMeasurement = require('./model');

/**
 * @export
 * @class UnitMeasurementValidation
 * 
 */
class UnitMeasurementValidation {
    /**
     * create an instance of UnitMeasurementValidation
     * @memberof UnitMeasurementValidation
     * @param {UnitMeasurement}
     * @returns {Joi.validationResult}
     */

    createUnitMeasurement(body){
      const schema = Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getUnitMeasurement(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new UnitMeasurementValidation();