const Joi = require('joi');
const ProductParam = require('./model');

/**
 * @export
 * @class ProductParamValidation
 * 
 */
class ProductParamValidation {
    /**
     * create an instance of ProductParamValidation
     * @memberof ProductParamValidation
     * @param {ProductParam}
     * @returns {Joi.validationResult}
     */

    createProductParam(body){
      const schema = Joi.object().keys({
        ProductId: Joi.string().required(),
        WarehouseId: Joi.string(),
        ProductMenuId: Joi.string(),
        PreparationTypeId: Joi.string(),
        updatePriceInInvoice: Joi.boolean(),
        belongsToWarehouse: Joi.boolean(),
        releaseToMenu: Joi.boolean(),
        invoicePriceRangeFrom: Joi.number(),
        invoicePriceRangeTO: Joi.number(),
        maxDiscount: Joi.number(),
        maxStock: Joi.number(),
        minStock: Joi.number(),
        replenishIn: Joi.string(),
        additional: Joi.string(),
        unitPoints: Joi.string(),
        attentionTimeServiceOrders: Joi.string(),
        calculatePriceInvoicePercetage: Joi.string(),
        pointsPerUnit: Joi.string(),
        gourmetQualify: Joi.object(),
        options: Joi.object(),
        productWithPreparation: Joi.boolean(),
        inventoryAccount: Joi.string(),
        salesAccount: Joi.string(),
        costSaleAccount: Joi.string(),
        fixedAsset: Joi.boolean(),
        isActive: Joi.boolean()
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getProductParam(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new ProductParamValidation();