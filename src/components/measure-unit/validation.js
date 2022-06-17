const Joi = require('joi');
const MeasureUnit = require('./model');

/**
 * @export
 * @class MeasureUnitValidation
 * 
 */
class MeasureUnitValidation {
    /**
     * create an instance of MeasureUnitValidation
     * @memberof MeasureUnitValidation
     * @param {MeasureUnit}
     * @returns {Joi.validationResult}
     */

    createMeasureUnit(body){
      const schema = Joi.object().keys({
        name: Joi.string().required().unique(),
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getMeasureUnit(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new MeasureUnitValidation();