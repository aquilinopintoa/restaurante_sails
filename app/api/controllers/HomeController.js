/**
 * HomeController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  
    index: function(req, res){
      return res.view('index')
    },

    app: function(req, res){
      return res.view('index')
    }
    
  };
  
  