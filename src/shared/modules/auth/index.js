const AuthService = require('./service');


async function signUp(req, res, next) {
  try {
    const {
      email, 
      username,
      firstname,
      password,
      lastname
    } = req.body;
    const Auths = await AuthService.signUp(req.body)
    res.status(200).json(Auths)
  } catch (error) {
    res.json(error.message)
  }
}

async function signIn(req, res, next){
  try {
    const {email, password} = req.body;
    const getAuth = await AuthService.signIn({email, password});
    res.status(201).json(getAuth)
  
  } catch (error) {
    res.json(error.message)
  }
}




module.exports = {
  signUp,
  signIn,
}