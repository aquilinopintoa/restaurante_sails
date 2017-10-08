
import Validator from 'validator'
import _ from 'lodash'

function notEmpty(value ){
    return _.isEmpty(value) ? 
        'Is Required' : undefined 
}

function notNull(value ){
    return value === undefined || Validator.isEmpty(value) ? 
        'Is Required' : undefined 
}

function email(value){
    return !Validator.isEmail(value) ? 'Invalid value' : undefined
}

function tektonlab(value){
    return value.toLowerCase().indexOf('@tektonlabs') < 0 ?
        'only tektonlabs domain'
        :
        undefined
}

export default function ValidateInput(aplyVals, value) {
    
    let error = undefined

    aplyVals.every(function(val) {
        let result

        switch (val) {
            case 'NOTNULL':
                error = notNull(value) 
                break 
            case 'NOTEMPTY':
                error = notEmpty(value) 
                break 
            case 'EMAIL':
                error = email(value)
                break
            case 'TEKTONLAB': 
                error = tektonlab(value)
                break
            default:
                console.log("validation not available")
        }  

        return !error
    });

    return error

}