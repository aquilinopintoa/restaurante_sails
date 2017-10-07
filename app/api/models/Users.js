/**
 * Users.js
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
        'ADMIN'
      ],
      required: true
    }
  },
  
  loadDefault: function(cb){
    
    if(!cb){
      cb = () => {}
    }

    const userData = [
      {
        email: 'chef@gmail.com',
        password: '1234',
        rol: 'CHEF'
      },{
        email: 'cajero@gmail.com',
        password: '1234',
        rol: 'CAJERO'
      },{
        email: 'admin@gmail.com',
        password: '1234',
        rol: 'ADMIN'
      }
      
    ]

    Users.findOrCreate(userData, userData, function(err, user){
      if(err){
        console.log(err)
        return cb(err)
      }

      return cb(undefined, user)
    })
  }

};

