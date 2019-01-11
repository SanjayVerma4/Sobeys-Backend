const Joi = require('joi');
/********************************************** Starts: Validation schema  ***************************************************/
// Make Schema for validate showdidtype
let schemasaveUser = Joi.object().keys({
     name: Joi.string().required(),
     email: Joi.string().required(),
     gender: Joi.string().required()
});

let sortingValidate = Joi.object().keys({
    key: Joi.string(),
    value: Joi.string(),
});
let pagingValidate = Joi.object().keys({
    page: Joi.number().min(1),
    limit: Joi.number(),
});

let schemavalidateLookupPerscription = Joi.object().keys({
    rxBarcode: Joi.string(),
    storeId: Joi.string(),
    rxNum: Joi.number(),
    patLastName: Joi.string(),
    patBirthDate: Joi.string(),
    rxSecurityToken: Joi.string()
}).min(1);

const schemaRefillRxRequestItem = {
    rxNum:Joi.number().required(),
    securityToken:Joi.string().max(64).required(),
    refillReadyDateType :Joi.string(),
    refillReadyDateAbsoluteDateTime : Joi.date(),
    refillReadyDateRelativeMinutesFromNow:Joi.number(),
    deliveryRouteType:Joi.string().max(50).required(),
    comment:Joi.string().max(2000)
}

let schemavalidateAddRefill = Joi.object().keys({
    refillRxList:Joi.array().items(Joi.object().keys(schemaRefillRxRequestItem)),
    storeId:Joi.string().required(),
    workOrderComment:Joi.string().max(200),
    callbackPhoneNumber:Joi.string().max(16)
});

let schemaGetDetailsByRXNumber = Joi.object().keys({
    rxNum:Joi.string().required()
});

/********************************************** Starts: Validation function  ***************************************************/

const validatesaveUser = (Input) => { 
    return Joi.validate(Input, schemasaveUser, { abortEarly: false });
}


const validateLookupPerscriptionInput = (Input) => { 
    return Joi.validate(Input, schemavalidateLookupPerscription, { abortEarly: false });
}

const validateAddRefill = (Input) => {
    return Joi.validate(Input, schemavalidateAddRefill, { abortEarly: false });
}

const validateGetDetailsByRXNumber = (Input) => {
    return Joi.validate(Input, schemaGetDetailsByRXNumber, { abortEarly: false });
}

module.exports = {
    validatesaveUser,
    validateLookupPerscriptionInput,
    validateAddRefill,
    validateGetDetailsByRXNumber,
}
