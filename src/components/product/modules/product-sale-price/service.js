const db = require('../../../../config/connection/connectBd');
const ProductSalePriceValidation = require('./validation');
const ProductSalePrice = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination')
const permissions = require('../../../../shared/middlewares/permissions');
const HttpResponse = require('../../../../shared/response');
const getUser = require('../../../../shared/middlewares/getUser');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {ProductSalePrice} model
 */
const ProductSalePriceService = {
  /**
   * @exports
   * @implements {ProductSalePrice} model
   * @description get all ProductSalePrices 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_PRODUCT_SALE_PRICE'])
      if (validatePermission) {
        const ProductSalePrices = await ProductSalePrice.findAll()
        return new HttpResponse(200, ProductSalePrices);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch(error) {
      return new HttpResponse(400, error.message);
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {ProductSalePrice} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_PRODUCT_SALE_PRICE'])
      if (validatePermission) {
        const validate = ProductSalePriceValidation.createProductSalePrice(body);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const user = await getUser(bearerHeader);
        
        const createProductSalePrice = await ProductSalePrice.create({
          ProductId: body.ProductId,
          GeneralValueTaxId: body.GeneralValueTaxId,
          SpecialOneValueTaxId: body.SpecialOneValueTaxId,
          SpecialTwoValueTaxId: body.SpecialTwoValueTaxId,
          generalValue: body.generalValue,
          generalUtilityValue: body.generalUtilityValue,
          comission: body.comission,
          specialOneValue: body.specialOneValue,
          specialTwoValue: body.specialTwoValue,
          specialTwoUtilityValue: body.specialTwoUtilityValue,
          isActive: body.isActive,
          createdBy: user.id
        });
        return new HttpResponse(201, createProductSalePrice);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {ProductSalePrice} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_PRODUCT_SALE_PRICE'])
      if (validatePermission) {
        const validate = ProductSalePriceValidation.getProductSalePrice(id);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const getProductSalePrice = await ProductSalePrice.findByPk(id);
        return new HttpResponse(200, getProductSalePrice);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {ProductSalePrice} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_PRODUCT_SALE_PRICE'])
      if (validatePermission) {
        const validate = await ProductSalePriceValidation.getProductSalePrice(id)

        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }

        const param = await ProductSalePrice.findByPk(id);

        await param.destroy();
  
        return new HttpResponse(200, 'ProductSalePrice eliminado');
        
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a ProductSalePrice in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_PRODUCT_SALE_PRICE'])
      if (validatePermission) {
        
        const validateid = await ProductSalePriceValidation.getProductSalePrice(id);
        
        if (validateid.error) {
          return new HttpResponse(400, validateid.error)
        }

        const user = await getUser(bearerHeader)

        const newProductSalePrice = await ProductSalePrice.update(
          {
            GeneralValueTaxId: body.GeneralValueTaxId,
            SpecialOneValueTaxId: body.SpecialOneValueTaxId,
            SpecialTwoValueTaxId: body.SpecialTwoValueTaxId,
            generalValue: body.generalValue,
            generalUtilityValue: body.generalUtilityValue,
            comission: body.comission,
            specialOneValue: body.specialOneValue,
            specialTwoValue: body.specialTwoValue,
            specialTwoUtilityValue: body.specialTwoUtilityValue,
            isActive: body.isActive,
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'precio modificado');
        
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_PRODUCT_SALE_PRICE'])
      if (validatePermission) {
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM ProductSalePrices WHERE generalValue LIKE '%${wherecond}%' AND isActive = ${isActive} OR generalUtilityValue LIKE '%${wherecond}%' AND isActive = ${isActive} OR comission LIKE '%${wherecond}%' AND isActive = ${isActive} OR specialOneValue LIKE '%${wherecond}%' AND isActive = ${isActive} OR specialTwoValue LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const ProductSalePrices = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, ProductSalePrices)
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
}

module.exports = ProductSalePriceService;