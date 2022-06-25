const ProductArea = require('./model');
const db = require('../../../../config/connection/connectBD');
const ProductAreaValidation = require('./validation');
const Pagination = require('../../../../shared/middlewares/pagination')
const permissions = require('../../../../shared/middlewares/permissions')
sequelize = db.sequelize;

/**
 * @exports
 * @implements {ProductArea} model
 */
const ProductAreaService = {
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const ProductAreas = await ProductArea.findAll()
        return ProductAreas;
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
   * @implements {ProductArea} model 
   */
  async create(bearerHeader ,body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = ProductAreaValidation.createProductArea(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const validateName = await ProductArea.findOne({
          where: {
            name: body.name
          }
        })
        if (validateName) {
          throw new Error('el nombre está en uso')
        }
  
        const createProductArea = await ProductArea.create(body);
        return createProductArea;
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
   * @implements {ProductArea} model
   */

   async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) { 
        const validate = ProductAreaValidation.getProductArea(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getProductArea = await ProductArea.findByPk(id)
        return getProductArea;
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
   * @implements {ProductArea} model
   */
  async delete(bearerHeader ,id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) { 
        const validate = await ProductAreaValidation.getProductArea(id)
  
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const getProductArea = await ProductArea.findByPk(id);
        
        await getProductArea.destroy()
  
        return getProductArea;
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
   * @description update a ProductArea in the db
   */
  async update(bearerHeader ,id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) { 
        const validateid = await ProductAreaValidation.getProductArea(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await ProductAreaValidation.createProductArea(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const validateName = await ProductArea.findOne({
          where: {
            name: body.name
          }
        })
        if (validateName) {
          throw new Error('el nombre está en uso')
        }
        const newProductArea = await ProductArea.update(
          {
            name: body.name,
            attentionArea: body.attentionArea,
            description: body.description,
            isActive: body.isActive 
          },
          {where: {id}}
        )
  
        return newProductArea;
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber,where){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_PAGINATION')
      if (validatePermission) {
        const productAreas = await Pagination('productAreas',sequelize,sizeAsNumber, pageAsNumber,where)
        return productAreas
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

module.exports = ProductAreaService;