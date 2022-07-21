const db = require('../../../../config/connection/connectBd');
const ProductMenuValidation = require('./validation');
const ProductMenu = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination')
const permissions = require('../../../../shared/middlewares/permissions');
const HttpResponse = require('../../../../shared/response');
const getUser = require('../../../../shared/middlewares/getUser');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {ProductMenu} model
 */
const ProductMenuService = {
  /**
   * @exports
   * @implements {ProductMenu} model
   * @description get all ProductMenus 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_PRODUCT_MENU'])
      if (validatePermission) {
        const ProductMenus = await ProductMenu.findAll()
        return new HttpResponse(200, ProductMenus);
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
   * @implements {ProductMenu} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_PRODUCT_MENU'])
      if (validatePermission) {
        const validate = ProductMenuValidation.createProductMenu(body);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const user = await getUser(bearerHeader);

        const existsProductMenu = await ProductMenu.findOne({
          where: {
            name: body.name
          }
        })
        if(existsProductMenu){
          return new HttpResponse(400, 'el nombre de menu ya está en uso')
        }
        
        const createProductMenu = await ProductMenu.create({
          name: body.name,
          ProductId: body.ProductId,
          description: body.description,
          products: body.products,
          isActive: body.isActive,
          createdBy: user.id
        });
        return new HttpResponse(201, createProductMenu);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {ProductMenu} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_PRODUCT_MENU'])
      if (validatePermission) {
        const validate = ProductMenuValidation.getProductMenu(id);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const getProductMenu = await ProductMenu.findByPk(id);
        let products = getProductMenu.products;
        products.adicion = 'papas fritas'
        console.log(products); 
        return new HttpResponse(200, getProductMenu);
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
   * @implements {ProductMenu} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_PRODUCT_MENU'])
      if (validatePermission) {
        const validate = await ProductMenuValidation.getProductMenu(id)

        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }

        const param = await ProductMenu.findByPk(id);

        await param.destroy();
  
        return new HttpResponse(200, 'ProductMenu eliminado');
        
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
   * @description update a ProductMenu in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_PRODUCT_MENU'])
      if (validatePermission) {
        
        const validateid = await ProductMenuValidation.getProductMenu(id);
        
        if (validateid.error) {
          return new HttpResponse(400, validateid.error)
        }
        
        if(body.name){
          const existsProductMenu = await ProductMenu.findOne({
            where: {
              name: body.name
            }
          })
          if(existsProductMenu){
            return new HttpResponse(400, 'el nombre ya está en uso')
          }
        }

        const user = await getUser(bearerHeader);

        const newProductMenu = await ProductMenu.update(
          {
            name: body.name,
            description: body.description,
            isActive: body.isActive,
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'menu modificado');
        
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  async addProducts(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_PRODUCT_MENU']);
      if(validatePermission){

        /**
         * vamos a agregar productos al menu :D
         */
         const menuAct = await ProductMenu.findByPk(id);

         let productos = body.products
 
         if(typeof(productos) === 'object'){
           for (let i = 0; i < productos.length; i++) {
             menuAct.products.push(productos[i]);
           }
           await ProductMenu.update({
             products: menuAct.products
           },{
             where:{id}
           })

           return new HttpResponse(200, `menu actualizado, productos en el menu: ${menuAct.products}`)
         }
        return new HttpResponse(400, 'los identificadores de los productos se deben enviar en un array')
      }

    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_PRODUCT_MENU'])
      if (validatePermission) {
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM productMenus WHERE name LIKE '%${wherecond}%' AND isActive = ${isActive} OR description LIKE '%${wherecond}%' AND isActive = ${isActive} OR products LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const ProductMenus = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, ProductMenus)
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
}

module.exports = ProductMenuService;