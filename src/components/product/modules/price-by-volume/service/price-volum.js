const {getValue} = require('../../product-sale-price/service/value');

const VolumeService = {

  async getVolumPrice(bearerHeader, ProducId, TaxId, value, comission, utility, cantidad){
    const valor = await getValue(bearerHeader, ProducId, TaxId, value, comission, utility);

    const priceUnit = valor.valorNeto;
    return {
      'valorUnitario': priceUnit,
      'valorLote': priceUnit*cantidad
    }
  }
}

module.exports = VolumeService;