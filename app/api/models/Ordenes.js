/**
 * Ordenes.js
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
    client_name: {
      type: 'string',
      required: true, 
      unique: true
    },
    type_payment: {
      type: 'string',
      enum: [
        'TDC',
        'EFECTIVO'
      ],
      required: true
    },
    state: {
      type: 'string',
      enum: [
        'COMANDA',
        'TERMINADO',
        'EN PROCESO'
      ],
      required: true
    },
    total:{
      type: 'float',
      required: true
    }
  }
};

