const Joi = require('joi');
const PriceByVolume = require('./model');

/**
 * @export
 * @class PriceByVolumeValidation
 * 
 */
class PriceByVolumeValidation {
    /**
     * create an instance of PriceByVolumeValidation
     * @memberof PriceByVolumeValidation
     * @param {PriceByVolume}
     * @returns {Joi.validationResult}
     */

    createPriceByVolume(body){
      const schema = Joi.object().keys({
        name: Joi.string().required(),
        ProductId: Joi.string().required(),
        TaxId: Joi.string(),
        utility: Joi.number(),
        value: Joi.number(),
        quantity: Joi.number()
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getPriceByVolume(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new PriceByVolumeValidation();