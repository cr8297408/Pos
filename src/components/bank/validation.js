const Joi = require('joi');
const Bank = require('./model');

/**
 * @export
 * @class BankValidation
 * 
 */
class BankValidation {
    /**
     * create an instance of BankValidation
     * @memberof BankValidation
     * @param {Bank}
     * @returns {Joi.validationResult}
     */

    createBank(body){
      const schema = Joi.object().keys({
        name: Joi.string().required(),
        accountingAccount: Joi.number().required(),
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getBank(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new BankValidation();