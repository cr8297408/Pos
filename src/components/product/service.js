const db = require('../../config/connection/connectBd');
const ProductValidation = require('./validation');
const Product = require('./model');
const Pagination = require('../../shared/middlewares/pagination');
const permissions = require('../../shared/middlewares/permissions');
const getUser = require('../../shared/middlewares/getUser');
const HttpResponse = require('../../shared/response');
const ProductSalePrice = require('./modules/product-sale-price/model');
const {getValue} = require('./modules/product-sale-price/service/value');


sequelize = db.sequelize;

/**
 * @exports
 * @implements {Product} model
 */
const ProductService = {
  /**
   * @exports
   * @implements {Product} model
   * @description get all Products 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_PRODUCT'])
      if (validatePermission) {
        const Products = await Product.findAll()
        return new HttpResponse(200, Products);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch(error) {
      throw new HttpResponse(400, error.message)
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {Product} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_PRODUCT'])
      if (validatePermission) {
        const validate = ProductValidation.createProduct(body);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
  
        const user = await getUser(bearerHeader);
        const validateName = await Product.findOne({
          where: {
            name: body.name
          }
        })
        if (validateName) {
          return new HttpResponse(400, 'el nombre ya está en uso');
        }
        const createProduct = await Product.create({
          name: body.name,
          description: body.description,
          code: body.code,
          ref: body.ref,
          subGroups: body.subGroups,
          barCode: body.barCode,
          barCodeGroup: body.barCodeGroup,
          ProductStructureId: body.ProductStructureId,
          ProductLineId: body.ProductLineId,
          UnitMeasurementId: body.UnitMeasurementId,
          ProductAreaId: body.ProductAreaId,
          ProductGroupId: body.ProductGroupId,
          FileId: body.FileId,
          shoppingAssistant: body.shoppingAssistant,
          isProductCurve: body.isProductCurve,
          compound: body.compound,
          isActive: body.isActive,
          createdBy: user.id
        });
        return new HttpResponse(201, createProduct);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
      
    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @implements {Product} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_PRODUCT'])
      if (validatePermission) {
        const validate = ProductValidation.getProduct(id);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const getProduct = await Product.findByPk(id);

        const getProductSalePrice = await ProductSalePrice.findOne({where: {ProductId: id}});

        /**traemos los datos calculados */
        const values = await getValue(bearerHeader, getProductSalePrice.ProductId, getProductSalePrice.GeneralValueTaxId, getProductSalePrice.generalValue, getProductSalePrice.comission, getProductSalePrice.generalUtilityValue, getProductSalePrice.SpecialOneValueTaxId, getProductSalePrice.SpecialTwoValueTaxId, getProductSalePrice.specialOneValue, getProductSalePrice.specialTwoValue, getProductSalePrice.specialOneUtilityValue, getProductSalePrice.specialTwoUtilityValue);
        getProduct.dataValues.costs = values;
         console.log(getProduct);
        return new HttpResponse(200, getProduct);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {Product} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_PRODUCT']);
      if (validatePermission) {
        const validate = await ProductValidation.getProduct(id)

        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }

        const getProduct = await Product.findByPk(id);
        
        await getProduct.destroy()

        return new HttpResponse(200, 'producto eliminado');
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error)
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a Product in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_PRODUCT'])
      if (validatePermission) {
        
        const validateid = await ProductValidation.getProduct(id);
        
        if (validateid.error) {
          throw new HttpResponse(400, validate.error)
        }
  
        const user = await getUser(bearerHeader);
        const validateName = await Product.findOne({
          where: {
            name: body.name
          }
        })
        if (validateName) {
          return new HttpResponse(400, 'el nombre ya está en uso');
        }
        const newProduct = await Product.update(
          {
            name: body.name,
            description: body.description,
            code: body.code,
            ref: body.ref,
            subGroups: body.subGroups,
            barCode: body.barCode,
            barCodeGroup: body.barCodeGroup,
            ProductStructureId: body.ProductStructureId,
            ProductLineId: body.ProductLineId,
            UnitMeasurementId: body.UnitMeasurementId,
            ProductAreaId: body.ProductAreaId,
            ProductGroupId: body.ProductGroupId,
            FileId: body.FileId,
            shoppingAssistant: body.shoppingAssistant,
            isProductCurve: body.isProductCurve,
            compound: body.compound,
            isActive: body.isActive,
            updatedBy: user.id 
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'producto actualizado');
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_PRODUCT'])
      if (validatePermission) {
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM products WHERE name LIKE '%${wherecond}%' AND isActive = ${isActive} OR description LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const products = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, products)
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(error.message);
    }
  },
}

module.exports = ProductService;