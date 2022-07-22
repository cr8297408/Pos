const TaxService = require('../../../../tax/service');

const CostService = {
  
  /**
   * get unitary cost and unitary iva of product
   * @param {*} bearerHeader 
   * @param {*} unitTaxCostId 
   * @param {*} unitCost 
   * @param {*} includeIcoInCost 
   * @param {*} valueIco 
   * @returns TotalCU TotalIU
   */
  async getCosts(bearerHeader, unitTaxCostId, unitCost, includeIcoInCost, valueIco){
    try {
      const porcentajeIvaU = await (await TaxService.findOne(bearerHeader, unitTaxCostId)).message.dataValues.tax;
      if(porcentajeIvaU){
        let ivaUnitario = unitCost*porcentajeIvaU/100
        let costoUnitario = unitCost + ivaUnitario
    
        if(includeIcoInCost){
          costoUnitario+=valueIco
        }
        return {
          'TotalCU': costoUnitario,
          'TotalIU': ivaUnitario
        }
      }

      return false
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = CostService;