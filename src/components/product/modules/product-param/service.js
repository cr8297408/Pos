const db = require('../../../../config/connection/connectBd');
const ProductParamValidation = require('./validation');
const ProductParam = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination')
const permissions = require('../../../../shared/middlewares/permissions');
const HttpResponse = require('../../../../shared/response');
const getUser = require('../../../../shared/middlewares/getUser');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {ProductParam} model
 */
const ProductParamService = {
  /**
   * @exports
   * @implements {ProductParam} model
   * @description get all ProductParams 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_PRODUCT_PARAM']);
      if (validatePermission) {
        const ProductParams = await ProductParam.findAll()
        return new HttpResponse(200, ProductParams);
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
   * @implements {ProductParam} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_PRODUCT_PARAM']);
      if (validatePermission) {
        const validate = ProductParamValidation.createProductParam(body);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const user = await getUser(bearerHeader);
        
        const createProductParam = await ProductParam.create({
          ProductId: body.ProductId,
          WarehouseId: body.WarehouseId,
          ProductMenuId: body.ProductMenuId,
          PreparationTypeId: body.PreparationTypeId,
          updatePriceInInvoice: body.updatePriceInInvoice,
          belongsToWarehouse: body.belongsToWarehouse,
          releaseToMenu: body.releaseToMenu,
          invoicePriceRangeFrom: body.invoicePriceRangeFrom,
          invoicePriceRangeTO: body.invoicePriceRangeTO,
          maxDiscount: body.maxDiscount,
          maxStock: body.maxStock,
          minStock: body.minStock,
          replenishIn: body.replenishIn,
          additional: body.additional,
          unitPoints: body.unitPoints,
          attentionTimeServiceOrders: body.attentionTimeServiceOrders,
          calculatePriceInvoicePercetage: body.calculatePriceInvoicePercetage,
          pointsPerUnit: body.pointsPerUnit,
          gourmetQualify: body.gourmetQualify,
          options: body.options,
          productWithPreparation: body.productWithPreparation,
          inventoryAccount: body.inventoryAccount,
          salesAccount: body.salesAccount,
          costSaleAccount: body.costSaleAccount,
          fixedAsset: body.fixedAsset,
          isActive: body.isActive,
          createdBy: user.id
        });
        return new HttpResponse(201, createProductParam);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {ProductParam} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_PRODUCT_PARAM'])
      if (validatePermission) {
        const validate = ProductParamValidation.getProductParam(id);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const getProductParam = await ProductParam.findByPk(id);
        return new HttpResponse(200, getProductParam);
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
   * @implements {ProductParam} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_PRODUCT_PARAM'])
      if (validatePermission) {
        const validate = await ProductParamValidation.getProductParam(id)

        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }

        const param = await ProductParam.findByPk(id);

        await param.destroy();
  
        return new HttpResponse(200, 'ProductParam eliminado');
        
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
   * @description update a ProductParam in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_PRODUCT_PARAM'])
      if (validatePermission) {
        
        const validateid = await ProductParamValidation.getProductParam(id);
        
        if (validateid.error) {
          return new HttpResponse(400, validateid.error)
        }
        
        const user = await getUser(bearerHeader)

        const newProductParam = await ProductParam.update(
          {
            WarehouseId: body.WarehouseId,
            ProductMenuId: body.ProductMenuId,
            PreparationTypeId: body.PreparationTypeId,
            updatePriceInInvoice: body.updatePriceInInvoice,
            belongsToWarehouse: body.belongsToWarehouse,
            releaseToMenu: body.releaseToMenu,
            invoicePriceRangeFrom: body.invoicePriceRangeFrom,
            invoicePriceRangeTO: body.invoicePriceRangeTO,
            maxDiscount: body.maxDiscount,
            maxStock: body.maxStock,
            minStock: body.minStock,
            replenishIn: body.replenishIn,
            additional: body.additional,
            unitPoints: body.unitPoints,
            attentionTimeServiceOrders: body.attentionTimeServiceOrders,
            calculatePriceInvoicePercetage: body.calculatePriceInvoicePercetage,
            pointsPerUnit: body.pointsPerUnit,
            gourmetQualify: body.gourmetQualify,
            options: body.options,
            productWithPreparation: body.productWithPreparation,
            inventoryAccount: body.inventoryAccount,
            salesAccount: body.salesAccount,
            costSaleAccount: body.costSaleAccount,
            fixedAsset: body.fixedAsset,
            isActive: body.isActive,
            isActive: body.isActive,
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'usuario modificado');
        
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_PRODUCT_PARAM'])
      if (validatePermission) {
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM ProductParams WHERE ProductId LIKE '%${wherecond}%' AND isActive = ${isActive} OR costSaleAccount LIKE '%${wherecond}%' AND isActive = ${isActive} OR salesAccount LIKE '%${wherecond}%' AND isActive = ${isActive} OR maxDiscount LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const ProductParams = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, ProductParams)
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
}

module.exports = ProductParamService;