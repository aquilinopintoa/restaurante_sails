
import Validator from 'validator'
import _ from 'lodash'

function notNull(value, ){
    return Validator.isEmpty(value) ? 'Is Required' : null 
}

function email(value){
    return Validator.isEmail(value) ? 'Invalid value' : null
}

function tektonlab(value){
    return value.toLowerCase().indexOf('@tektonlab') < 0 ?
        'only tektonlab domain'
        :
        null
}

export default function ValidateInput(applyVals, value, fieldName) {
    
    const errors = {}

    applyVals.array.every(function(val) {
        const result
        switch (val) {
            case 'NOTNULL':
                result = notNull(value) 
                break 
            case 'EMAIL':
                result = email()
                break
            case 'TEKTONLAB': 
                result = tektonlab()
                break
            default:
                console.log("validation not available")
        }  
        if(result)
            errors[fieldName] = result

        return !result
    });

    return errors

}