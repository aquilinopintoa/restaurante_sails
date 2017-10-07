
import Validator from 'validator'
import _ from 'lodash'

function notNull(value, ){
    return Validator.isEmpty(value)
}

function email(value){
    return Validator.isEmail(value)
}

function tektonlab(value){
    return value.toLowerCase().indexOf('@tektonlab') > 0
}

export default function ValidateInput(applyVals, value, fieldName) {
    
    const errors = {}

    applyVals.array.forEach(function(val) {
        switch (val) {
            case 'NOTNULL':
                notNull(value, fieldName) 
                break 
            case 'EMAIL':
                email()
                break
            case 'TEKTONLAB': 
                tektonlab()
                break
            default:
                console.log("validation not available")
        }  
    });

    return {
        errors
    }

}