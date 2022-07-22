const ProductSalePrice = require('../model');
const {getCosts} = require('../../taxes-and-cost/service/total-cu-iu');
const Tax = require('../../../../tax/model');
const TaxesAndCost = require('../../taxes-and-cost/model');

const ValueService = {

  async getValue(bearerHeader, idProduct,tax, value , commision, utilidad){
    try {

      const getTaxesAndCost = await TaxesAndCost.findOne({where: {ProductId: idProduct}});

      if(getTaxesAndCost){
        const taxPorc = await Tax.findByPk(tax);
        if(taxPorc){
          let taxU = taxPorc.dataValues.tax
          const costs = await getCosts(bearerHeader, getTaxesAndCost.unitTaxCostId, getTaxesAndCost.unitCost,getTaxesAndCost.includeIcoInCost, getTaxesAndCost.valueIco);
          if(costs){
            /**
             * aunque llegue elvalor del front, me aseguro que ese valor corresponda al costo unitario mas el porcentaje de utilidad que se le aplicará
             */
            let valueCU = costs.TotalCU;
            validateValue = valueCU + valueCU*utilidad/100
            if(value !== validateValue){
              value = validateValue;
            }
            let taxCal = (value*taxU/100);
            let valueCal = value + taxCal;
            let commisionCal = value*commision/100
  
            return {
              'valor neto': valueCal,
              'iva': taxCal,
              'comission': commisionCal
            }
        }
        }
      }

      return 0
      
    } catch (error) {
      throw new Error(error.message);
    }
  }

}

module.exports = ValueService;