const Joi = require('joi');
/********************************************** Starts: Validation schema  ***************************************************/
// Make Schema for validate showdidtype
let schemasaveUser = Joi.object().keys({
     name: Joi.string().required(),
     email: Joi.string().required(),
     gender: Joi.string().required()
});
let filterValidate = {
    rxBarcode: Joi.string(),
    storeId: Joi.string(),
    rxNum: Joi.number(),
    patLastName: Joi.string(),
    patBirthDate: Joi.string(),
    rxSecurityToken: Joi.string()
};
let sortingValidate = Joi.object().keys({
    key: Joi.string(),
    value: Joi.string(),
});
let pagingValidate = Joi.object().keys({
    page: Joi.number().min(1),
    limit: Joi.number(),
});
let schemavalidateLookupPerscription = Joi.object().keys({
    params: Joi.object(filterValidate).min(1),
});

let schemavalidateAddRefill = Joi.object().keys({
    storeId:Joi.string().required(),
    patientId:Joi.string().required(),
    rxNum:Joi.number().required(),
    securityToken:Joi.string().required(),
    comment:Joi.string()
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

module.exports = {
    validatesaveUser,
    validateLookupPerscriptionInput,
    validateAddRefill,
}
