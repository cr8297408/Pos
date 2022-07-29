const { Op } = require('sequelize');
const db = require('../../../../config/connection/connectBd');
const ProductStructureValidation = require('./validation');
const ProductStructure = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination');
const permissions = require('../../../../shared/middlewares/permissions');
const getUser = require('../../../../shared/middlewares/getUser');
const HttpResponse = require('../../../../shared/response');


sequelize = db.sequelize;

/**
 * @exports
 * @implements {ProductStructure} model
 */
const ProductStructureService = {
  /**
   * @exports
   * @implements {ProductStructure} model
   * @description get all ProductStructures 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_PRODUCT_STRUCTURE']);
      if (validatePermission) {
        const ProductStructures = await ProductStructure.findAll()
        return new HttpResponse(200, ProductStructures);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch(error) {
      throw new HttpResponse(400, error.message)
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {ProductStructure} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_PRODUCT_STRUCTURE'])
      if (validatePermission) {
        const validate = ProductStructureValidation.createProductStructure(body);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }

        const existsStruct = await ProductStructure.findOne({
          where: {
            [Op.or]: [
              {name: body.name},
              {code: body.code}
            ]
          }
        })

        if (!existsStruct) {
          const user = await getUser(bearerHeader);
          const createProductStructure = await ProductStructure.create({
            name: body.name,
            code: body.code,
            isActive: body.isActive,
            createdBy: user.id
          });
          return new HttpResponse(200, createProductStructure);
        }
        return new HttpResponse(400, 'nombre o codigo en uso')
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

      
    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @implements {ProductStructure} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_PRODUCT_STRUCTURE']);
      if (validatePermission) {
        const validate = ProductStructureValidation.getProductStructure(id);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const getProductStructure = await ProductStructure.findByPk(id)
        return new HttpResponse(200, getProductStructure);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {ProductStructure} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_PRODUCT_STRUCTURE']);
      if (validatePermission) {
        const validate = await ProductStructureValidation.getProductStructure(id)

        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }

        const getProductStructure = await ProductStructure.findByPk(id);
        
        const item = await ProductStructure.update(
          {
            isActive: getProductStructure.isActive? false : true
          },
          {where: {id}}
        )

        return new HttpResponse(200, item);
        
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
   * @description update a ProductStructure in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_PRODUCT_STRUCTURE']);
      if (validatePermission) {
        
        const validateid = await ProductStructureValidation.getProductStructure(id);
        
        if (validateid.error) {
          throw new HttpResponse(400, validateid.error)
        }
  
        const user = await getUser(bearerHeader);

        const existsStruct = await ProductStructure.findOne({
          where: {
            [Op.and]: [
              {name: body.name},
              {code: body.code}
            ]
          }
        })

        if(!existsStruct){
          const newProductStructure = await ProductStructure.update(
            {
              name: body.name,
              isActive: body.isActive,
              updatedBy: user.id 
            },
            {where: {id}}
          )
    
          return new HttpResponse(200,body);
        }
        
        return new HttpResponse(400, 'nombre o codigo en uso');
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message);      
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_PRODUCT_STRUCTURE']);
      if (validatePermission) {
        
        let query = `SELECT * FROM 
        productStructures  
        WHERE isActive = ${isActive} AND
        ( 
          name LIKE '%${wherecond}%' OR 
          code LIKE '%${wherecond}%'
        )`
        const ProductStructures = await Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        const total = await ProductStructure.count({
          where:{isActive:isActive}
        })
        let totalPage = total/sizeAsNumber;
        let response={
          items: ProductStructures??[],
          total:total??0,
          currentPage:pageAsNumber??0,
          totalPage:totalPage
        }

        return new HttpResponse(200, response)

      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },
}

module.exports = ProductStructureService;