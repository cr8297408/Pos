const Joi = require('joi');
const EconomicActivities = require('./model');

/**
 * @export
 * @class EconomicActivitiesValidation
 * 
 */
class EconomicActivitiesValidation {
    /**
     * create an instance of EconomicActivitiesValidation
     * @memberof EconomicActivitiesValidation
     * @param {EconomicActivities}
     * @returns {Joi.validationResult}
     */

    createEconomicActivities(body){
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
     getEconomicActivities(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new EconomicActivitiesValidation();