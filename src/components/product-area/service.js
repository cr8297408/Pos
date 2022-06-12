const ProductArea = require('./model');
const db = require('../../config/connection/connectBD');
const ProductAreaValidation = require('./validation');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {ProductArea} model
 */
const ProductAreaService = {
  async findAll(){
    try {
      const ProductAreas = await ProductArea.findAll()
      return ProductAreas;
    } catch(error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @param {*} body
   * @implements {ProductArea} model 
   */
  async create(body) {
    try {
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

    } catch (error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @implements {ProductArea} model
   */

   async findOne(id){
    try {
      const validate = ProductAreaValidation.getProductArea(id);
      if (validate.error) {
        throw new Error(validate.error)
      }
      const getProductArea = await ProductArea.findByPk(id)
      return getProductArea;


    } catch (error) {
      throw new Error(error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {ProductArea} model
   */
  async delete(id){
    try {
      const validate = await ProductAreaValidation.getProductArea(id)

      if (validate.error) {
        throw new Error(validate.error)
      }

      const getProductArea = await ProductArea.findByPk(id);
      
      await getProductArea.destroy()

      return getProductArea;
      

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
  async update(id, body){
    try {
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
    } catch (error) {
      
    }
  }

}

module.exports = ProductAreaService;