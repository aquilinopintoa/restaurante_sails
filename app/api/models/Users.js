/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id:{
      autoIncrement: true
    },
    email: {
      type: 'email',
      required: true, 
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    rol: {
      type: 'string',
      enum: [
        'CAJERO',
        'CHEF',
        'MESONERO'
      ],
      required: true
    }
  },
  
  loadDefault: function(cb){
    
    if(!cb){
      cb = () => {}
    }

    const userData = {
      email: 'aquilinopintoa@gmail.com',
      password: '20220546',
      rol: 'CHEF'
    }

    Users.findOrCreate(userData, userData, function(err, user){
      if(err){
        console.log(err)
        return cb(err)
      }

      return cb(undefined, user)
    })
  }

};

