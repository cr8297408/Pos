const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const db = require('../../../config/connection/connectBD');
const AuthValidation = require('./validation');
const User = require('../user/model');
const config = require('../../../config/env')
const sendMail = require('../../resources/send-mail');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {Auth} model
 */
const AuthService = {
  /**
   * @exports
   * @param {*} body
   * @implements {Auth} model 
   */
  async signUp(body) {
    try {
      const validate = AuthValidation.createAuth(body);
      if (validate.error) {
        throw new Error(validate.error)
      }
      const validateUser = await User.findOne({
        where: {username: body.username}
      });
      const validateEmail = await User.findOne({
        where: {email: body.email}
      });
      if (validateUser) {
        throw new Error('el usuario ya está en uso...')
      }
      if (validateEmail) {
        throw new Error('el email ya está en uso...')
      }
      const dataUser = {
        email: body.email,
        username: body.username,
        firstName: body.firstName,
        lastName: body.lastName,
        password: bcrypt.hashSync(body.password, 10),
      }
      const createdAuth = await User.create(dataUser);
      const emailFrom = config.MAIL_USER;
      const emailTo = body.email;
      const text = "<h1>Hello world</h1>"
      const subject = 'Registro en Pos API'
      await sendMail('te has registrado a mi API', emailFrom, emailTo, subject, text)
      return createdAuth;

    } catch (error) {
      throw new Error(error.message)
    }
  },

  async signIn(body){
    try {
      const validate = AuthValidation.getAuth(body);
      if (validate.error) {
        throw new Error(validate.error)
      }

      const user = await User.findOne({
        where: {email: body.email}
      })
      console.log(user);

      if (!user) {
        throw new Error('credenciales incorrectas')
      }
      const result = bcrypt.compareSync(body.password, user.password);
      if (!result) {
        throw new Error('credenciales incorrectas')
      }
      const dataToken = {
        id : user.id,
        isAdmin : user.isAdmin,
        isActive : user.isActive,
        verified : user.verified,
        typeUser: user.typeUser,
      }

      const token = jsonwebtoken.sign({dataToken}, config.JWT_SECRET);
      return token;

    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = AuthService;