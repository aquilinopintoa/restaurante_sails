/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt')

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

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
          if(err) {
              console.log(err);
              cb(err);
          } else {
              user.password = hash;
              cb(null, user);
          }
        });
    });
  },
  
  loadDefault: function(cb){
    
    if(!cb){
      cb = () => {}
    }

    const userDataSP = [
      {
        email: 'admin@tektonlab.com',
      }
    ]

    const userData = [{
        email: 'admin@tektonlabs.com',
        password: '1234',
        rol: 'ADMIN'
      }
    ]

    Users.findOrCreate(userDataSP, userData, function(err, user){
      if(err){
        console.log(err)
        return cb(err)
      }

      return cb(undefined, user)
    })
  }

};

