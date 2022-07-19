const db = require('../../../../config/connection/connectBd');
const EconomicActivitiesValidation = require('./validation');
const EconomicActivities = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination');
const permissions = require('../../../../shared/middlewares/permissions');
const getUser = require('../../../../shared/middlewares/getUser');
const HttpResponse = require('../../../../shared/response');
const { Op } = require('sequelize');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {EconomicActivities} model
 */
const EconomicActivitiesService = {
  /**
   * @exports
   * @implements {EconomicActivities} model
   * @description get all EconomicActivitiess 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_ECONOMIC_ACTIVITIE']);
      if (validatePermission) {
        const EconomicActivitiess = await EconomicActivities.findAll()
        return new HttpResponse(200, EconomicActivitiess);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch(error) {
      throw new HttpResponse(400, error.message)
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {EconomicActivities} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_ECONOMIC_ACTIVITIE']);
      if (validatePermission) {
        const validate = EconomicActivitiesValidation.createEconomicActivities(body);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const user = await getUser(bearerHeader);
        
        /** unique validations */
        // const validateName = await ThirdParties.findOne({
        //   where: {
        //     [Op.or]: [{nameActivity: body.nameActivity}, {codeCiu: body.codeCiu}, {codeActivity: body.nameActivity}]
        //   }
        // })
        // if (validateName) {
        //   return new HttpResponse(400, 'el nombre ya está en uso');
        // }
        const validateName = await EconomicActivities.findOne({
          where: {
            [Op.or]: [{nameActivity: body.nameActivity}, {codeActivity: body.codeActivity}]
          }
        })
        if (validateName) {
          return new HttpResponse(400, 'nombre o codigo en uso');
        }
        const createEconomicActivities = await EconomicActivities.create({
          nameActivity: body.nameActivity,
          codeCiu: body.codeCiu,
          codeActivity: body.codeActivity,
          rate: body.rate,
          isActive: body.isActive,
          createdBy: user.id
        });
        return new HttpResponse(201, createEconomicActivities);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')
      
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {EconomicActivities} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_ECONOMIC_ACTIVITIE']);
      if (validatePermission) {
        const validate = EconomicActivitiesValidation.getEconomicActivities(id);
        if (validate.error) {
          throw new HttpResponse(400, validate.error);
        }
        const getEconomicActivities = await EconomicActivities.findByPk(id)
        return new HttpResponse(200, getEconomicActivities);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {EconomicActivities} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_ECONOMIC_ACTIVITIE']);
      if (validatePermission) {
        const validate = await EconomicActivitiesValidation.getEconomicActivities(id)

        if (validate.error) {
          throw new HttpResponse(validate.error)
        }

        const getEconomicActivities = await EconomicActivities.findByPk(id);
        
        await getEconomicActivities.destroy()

        return new HttpResponse(200, 'actividad eliminada');
        
      } 
      
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a EconomicActivities in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_ECONOMIC_ACTIVITIE'])
      if (validatePermission) {
        
        const validateid = await EconomicActivitiesValidation.getEconomicActivities(id);
        
        if (validateid.error) {
          throw new HttpResponse(validateid.error)
        }
  
        const user = await getUser(bearerHeader);

        if (body.nameActivity) {
          const validateName = await EconomicActivities.findOne({
            where: {
              [Op.or]: [{nameActivity: body.nameActivity}, {codeActivity: body.codeActivity}]
            }
          })
          if (validateName) {
            return new HttpResponse(400, 'nombre o codigo en uso');
          }
        }

        const newEconomicActivities = await EconomicActivities.update(
          {
            nameActivity: body.nameActivity,
            codeCiu: body.codeCiu,
            codeActivity: body.codeActivity,
            rate: body.rate,
            isActive: body.isActive,
            updatedBy: user.id 
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'actividad actualizada');
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message);      
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_ECONOMIC_ACTIVITES']);
      if (validatePermission) {
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM economicActivities WHERE name LIKE '%${wherecond}%' AND isActive = ${isActive} OR codeCiu LIKE '%${wherecond}%' AND isActive = ${isActive} OR codeActivity LIKE '%${wherecond}%' AND isActive = ${isActive} OR rate LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const economicActivities = Pagination(sequelize,sizeAsNumber, pageAsNumber, query);
        return new HttpResponse(200, economicActivities);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
        throw new HttpResponse(400, error.message);
    }
  },
}

module.exports = EconomicActivitiesService;