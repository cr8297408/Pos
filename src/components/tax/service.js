const Tax = require('./model');
const db = require('../../config/connection/connectBD');
const TaxValidation = require('./validation');
const permissions = require('../../shared/middlewares/permissions');
const Pagination = require('../../shared/middlewares/pagination');
const getUser = require('../../shared/middlewares/getUser');
const HttpResponse = require('../../shared/response');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {Tax} model
 */
const TaxService = {
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_TAX'])
      if (validatePermission) { 
        const Taxs = await Tax.findAll()
        return new HttpResponse(200, Taxs);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch(error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @param {*} body
   * @implements {Tax} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_TAX'])
      if (validatePermission) { 
        const validate = TaxValidation.createTax(body);
        if (validate.error) {
          throw new HttpResponse(validate.error);
        }
        const user = await getUser(bearerHeader);

        const validateName = await Tax.findOne({
          where: {
            name: body.name
          }
        })
        if (validateName) {
          return new HttpResponse(400, 'el nombre ya está en uso');
        }

        const createTax = await Tax.create({
          name: body.name,
          description:body.description,
          tax: body.tax,
          taxType: body.taxType,
          isActive: body.isActive,
          createdBy: user.id
        });
        return new HttpResponse(201, createTax);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @implements {Tax} model
   */

   async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_TAX']);
      if (validatePermission) { 
        const validate = TaxValidation.getTax(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getTax = await Tax.findByPk(id)
        return new HttpResponse(200, getTax);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');

    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {Tax} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_TAX']);
      if (validatePermission) { 
        const validate = await TaxValidation.getTax(id)
  
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
  
        const getTax = await Tax.findByPk(id);
        
        await getTax.destroy()
  
        return new HttpResponse(200, 'impuesto eliminado');
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')      

    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a Tax in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_TAX']);
      if (validatePermission) {
        const validateid = await TaxValidation.getTax(id);
        
        if (validateid.error) {
          throw new Error(validateid.error)
        }
  
        const user = await getUser(bearerHeader);

        const validateName = await Tax.findOne({
          where: {
            name: body.name
          }
        })
        if (validateName) {
          return new HttpResponse(400, 'el nombre ya está en uso');
        }

        const newTax = await Tax.update(
          {
            name: body.name,
            description:body.description,
            tax: body.tax,
            taxType: body.taxType,
            isActive: body.isActive, 
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'impuesto actualizado');
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message);      
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber,where){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_TAX'])
      if (validatePermission) {
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM taxes WHERE name LIKE '%${wherecond}%' AND isActive = ${isActive} OR description LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const taxes = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, taxes)
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

}

module.exports = TaxService;