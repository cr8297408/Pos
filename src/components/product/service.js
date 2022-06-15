const db = require('../../config/connection/connectBd');
const ProductValidation = require('./validation');
const Product = require('./model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions')

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
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const Products = await Product.findAll()
        return Products;
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch(error) {
      throw new Error(error.message)
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {Product} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = ProductValidation.createProduct(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const createProduct = await Product.create(body);
        return createProduct;
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
      
    } catch (error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @implements {Product} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = ProductValidation.getProduct(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getProduct = await Product.findByPk(id)
        return getProduct;
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {Product} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await ProductValidation.getProduct(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getProduct = await Product.findByPk(id);
        
        await getProduct.destroy()

        return getProduct;
        
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      throw new Error(error)
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
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await ProductValidation.getProduct(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await ProductValidation.createProduct(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const newProduct = await Product.update(
          {
            name: body.name,
            accountingAccount: body.accountingAccount 
          },
          {where: {id}}
        )
  
        return newProduct;
        
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_PAGINATION')
      if (validatePermission) {
        const Products = await Pagination('Products',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return Products
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
        throw new Error(error.message);
    }
  },
}

module.exports = ProductService;