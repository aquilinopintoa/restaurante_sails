/**
 * Platos.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id:{
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: 'string',
      required: true, 
      unique: true
    },
    description: {
      type: 'string',
      required: true
    },
    precio: {
      type: 'float',
      required: true
    },

  },

  loadDefault: function(cb){
    
    if(!cb){
      cb = () => {}
    }

    const platosData = [ 
      {
        name: 'lomito',
        description: 'carne',
        precio: 10.5
      },
      {
        name: 'pollo',
        description: 'pollo',
        precio: 10.5
      },
      {
        name: 'arroz',
        description: 'arroz',
        precio: 10.5
      }
    ]

    Platos.findOrCreate(platosData, platosData, function(err, platos){
      if(err){
        console.log(err)
        return cb(err)
      }

      return cb(undefined, platos)
    })
  }
};

