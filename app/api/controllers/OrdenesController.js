/**
 * OrdenesController
 *
 * @description :: Server-side logic for managing ordenes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    create: function(req, res){
        const params = req.params.all()
        params.state = 'COMMAND'
        Ordenes.create(params, function(err, orden){
            if(err){
                console.log(err)
                return res.json({error: err})
            }

            let orden_plato = []

            params.platos.forEach(function(plato){
                orden_plato.push({
                    plato: plato,
                    orden: orden.id
                })
            })

            Ordenesplatos.createEach(orden_plato, function(err, news){
                if(err){
                    console.log(err)
                    return res.json({error: err})
                }

                const salida = orden.toJSON()
                salida.platos = params.platos

                return res.json(salida)
            })
        })
    },

    get: function(req, res){
        
        Ordenes.find().exec(function(err, ordenes){
            if(err){
                console.log(err)
                return res.json({error: err})
            }

            Ordenesplatos.find().exec(function(err, rels){
                if(err){
                    console.log(err)
                    return res.json({error: err})
                }
                
                // performance -1 (time)
                ordenes.forEach(function(orden){
                    rels.forEach(function(rel){
                        if(rel.orden === orden.id){
                            if(!orden.platos)
                                orden.platos = []
                            orden.platos.push(rel.plato)
                        }
                    })
                })
                
                return res.json(ordenes)
            })
        })
    },

    update: function(req, res){
        
        const params = req.params.all()
        Ordenes.update({id: params.id}, {state:params.state}, function(err, ordenes){
            if(err){
                console.log(err)
                return res.json({error: err})
            }
            
            let orden = undefined
            
            if(ordenes.length === 0)
                return res.json(orden)
            
            orden = ordenes[0]

            Ordenesplatos.find({orden: orden.id})
            .exec(function(err, rels){
                if(err){
                    console.log(err)
                    return res.json({error: err})
                }
                
                orden.platos = []
                
                rels.forEach(function(rel){
                    orden.platos.push(rel.plato)
                })

                return res.json(orden)
            })
        })
    }
	
};

