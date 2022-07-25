const ProductSalePrice = require('../model');
const {getCosts} = require('../../taxes-and-cost/service/total-cu-iu');
const Tax = require('../../../../tax/model');
const TaxesAndCost = require('../../taxes-and-cost/model');

const ValueService = {

  async getValue(bearerHeader, idProduct,tax, value , commision, utilidad, SpecialOneValueTaxId, SpecialTwoValueTaxId, specialOneValue, specialTwoValue, specialOneUtilityValue, specialTwoUtilityValue){
    try {

      const getTaxesAndCost = await TaxesAndCost.findOne({where: {ProductId: idProduct}});

      if(getTaxesAndCost){
        var taxPorc = await Tax.findByPk(tax);
        let response = {}
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
  
            
            response.costs = costs,
            response.valorNeto = valueCal,
            response.iva = taxCal,
            response.comission = commisionCal
          }
        }

        if(specialOneValue){
          if(!SpecialOneValueTaxId){
            SpecialOneValueTaxId = tax;
          }
          if(!specialOneUtilityValue){
            specialOneUtilityValue = utility;
          }
          const taxPorc1 = await Tax.findByPk(SpecialOneValueTaxId);

          if (!taxPorc1) {
            taxPorc1 = taxPorc; 
          }
          let taxU = taxPorc1.dataValues.tax
          const costs = await getCosts(bearerHeader, getTaxesAndCost.unitTaxCostId, getTaxesAndCost.unitCost,getTaxesAndCost.includeIcoInCost, getTaxesAndCost.valueIco);
          if(costs){
            /**
             * aunque llegue elvalor del front, me aseguro que ese valor corresponda al costo unitario mas el porcentaje de utilidad que se le aplicará
             */
            let valueCU = costs.TotalCU;
            validateValue = valueCU + valueCU*specialOneUtilityValue/100
            if(value !== validateValue){
              value = validateValue;
            }
            let taxCal = (value*taxU/100);
            let valueCal = value + taxCal;
            let commisionCal = value*commision/100
            
            response.specialOneValorNeto = valueCal,
            response.specialOneIva = taxCal,
            response.specialOneComission = commisionCal
          
          }
        }

        if(specialTwoValue){
          if(!SpecialTwoValueTaxId){
            SpecialTwoValueTaxId = tax;
          }
          if(!specialTwoUtilityValue){
            specialTwoUtilityValue = utility;
          }
          const taxPorc1 = await Tax.findByPk(SpecialTwoValueTaxId);

          if (!taxPorc1) {
            taxPorc1 = taxPorc; 
          }
          let taxU = taxPorc1.dataValues.tax
          const costs = await getCosts(bearerHeader, getTaxesAndCost.unitTaxCostId, getTaxesAndCost.unitCost,getTaxesAndCost.includeIcoInCost, getTaxesAndCost.valueIco);
          if(costs){
            /**
             * aunque llegue elvalor del front, me aseguro que ese valor corresponda al costo unitario mas el porcentaje de utilidad que se le aplicará
             */
            let valueCU = costs.TotalCU;
            validateValue = valueCU + valueCU*specialTwoUtilityValue/100
            if(value !== validateValue){
              value = validateValue;
            }
            let taxCal = (value*taxU/100);
            let valueCal = value + taxCal;
            let commisionCal = value*commision/100
            
            response.specialTwoValorNeto = valueCal,
            response.specialTwoIva = taxCal,
            response.specialTwoComission = commisionCal
          
          }
        }

        return response
      }

      return 0
      
    } catch (error) {
      throw new Error(error.message);
    }
  }

}

module.exports = ValueService;