/**
 * HomeController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  
    index: function(req, res){
      console.log("hola", req.url)
      return res.view('index')
    }
    
  };
  
  