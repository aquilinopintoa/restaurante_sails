/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  get: function(req, res){

    return res.json(req.session.authenticated)
  },

  getAll: function(req, res){
    Users.find(req.query, function(err, users){
      if(err){
        console.log(err)
        return res.json({error: err})
      }
      return res.json(users)
    })
  },

  login: function(req, res){
    const params = req.params.all()
    console.log(params)
    Users.findOne({
      email: params.email
    }).exec(function(err, user){
      if(err || !user){
        console.log("err login")
        return res.json({error:err })
      }

      if(user.password != params.password){
        console.log('Email or Password invalid')
        return res.json({error:'Email or Password invalid'})
      }

      req.session.authenticated = user

      return res.json(user)
    })
  }
	
};

