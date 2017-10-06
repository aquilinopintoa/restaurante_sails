/**
 * PlatosController
 *
 * @description :: Server-side logic for managing platos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    get: function(req, res){
        
        Platos.find().exec(function(err, platos){
            if(err){
                console.log(err)
                return res.json({error: err})
            }

            return res.json(platos)
        })
    }
	
};

