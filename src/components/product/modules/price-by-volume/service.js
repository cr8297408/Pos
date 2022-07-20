const db = require('../../../../config/connection/connectBd');
const PriceByVolumeValidation = require('./validation');
const PriceByVolume = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination')
const permissions = require('../../../../shared/middlewares/permissions');
const HttpResponse = require('../../../../shared/response');
const getUser = require('../../../../shared/middlewares/getUser');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {PriceByVolume} model
 */
const PriceByVolumeService = {
  /**
   * @exports
   * @implements {PriceByVolume} model
   * @description get all PriceByVolumes 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_PRICE_BY_VOLUME'])
      if (validatePermission) {
        const PriceByVolumes = await PriceByVolume.findAll()
        return new HttpResponse(200, PriceByVolumes);
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
   * @implements {PriceByVolume} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_PRICE_BY_VOLUME'])
      if (validatePermission) {
        const validate = PriceByVolumeValidation.createPriceByVolume(body);
        if (validate.error) {
          console.log(new HttpResponse(400, validate.error));
          return new HttpResponse(400, validate.error);
        }
        const user = await getUser(bearerHeader);
        if(body.name){
          const existsPriceByVolume = await PriceByVolume.findOne({
            where: {
              name: body.name
            }
          })
          if(existsPriceByVolume){
            return new HttpResponse(400, 'el nombre ya está en uso')
          }
        }
        
        const createPriceByVolume = await PriceByVolume.create({
          name: body.name,
          ProducId: body.ProductId,
          TaxId: body.TaxId,
          utility: body.utility,
          value: body.value,
          quantity: body.quantity,
          isActive: body.isActive,
          createdBy: user.id
        });
        return new HttpResponse(201, createPriceByVolume);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {PriceByVolume} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_PRICE_BY_VOLUME'])
      if (validatePermission) {
        const validate = PriceByVolumeValidation.getPriceByVolume(id);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const getPriceByVolume = await PriceByVolume.findByPk(id);
        return new HttpResponse(200, getPriceByVolume);
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
   * @implements {PriceByVolume} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_PRICE_BY_VOLUME'])
      if (validatePermission) {
        const validate = await PriceByVolumeValidation.getPriceByVolume(id)

        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }

        const newUser = await PriceByVolume.findByPk(id);

        await newUser.destroy();
  
        return new HttpResponse(200, 'precio por volumen eliminado');
        
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
   * @description update a PriceByVolume in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_PRICE_BY_VOLUME'])
      if (validatePermission) {
        
        const validateid = await PriceByVolumeValidation.getPriceByVolume(id);
        
        if (validateid.error) {
          return new HttpResponse(400, validateid.error)
        }
        
        if(body.name){
          const existsPriceByVolume = await PriceByVolume.findOne({
            where: {
              name: body.name
            }
          })
          if(existsPriceByVolume){
            return new HttpResponse(400, 'el nombre ya está en uso')
          }
        }
        const user = await getUser(bearerHeader);

        const newPriceByVolume = await PriceByVolume.update(
          {
            name: body.name,
            ProducId: body.ProductId,
            TaxId: body.TaxId,
            utility: body.utility,
            value: body.value,
            quantity: body.quantity,
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
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_PRICE_BY_VOLUME'])
      if (validatePermission) {
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM priceByVolumes WHERE ProductId LIKE '%${wherecond}%' AND isActive = ${isActive} OR description LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const priceByVolumes = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, priceByVolumes)
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
}

module.exports = PriceByVolumeService;