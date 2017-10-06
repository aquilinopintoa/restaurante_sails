/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  get: function(req, res){
    Users.find(req.query, function(err, users){
      if(err){
        console.log(err)
        return res.json({err})
      }
      return res.json(users)
    })
  }
	
};

