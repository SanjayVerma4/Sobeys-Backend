const Joi = require('joi');
/********************************************** Starts: Validation schema  ***************************************************/
// Make Schema for validate showdidtype
let schemasaveUser = Joi.object().keys({
     name: Joi.string().required(),
     email: Joi.string().required(),
     gender: Joi.string().required()
});
let filterValidate = Joi.object().keys({
    id: Joi.number(),
    name: Joi.string(),
    status:Joi.number(),
});
let sortingValidate = Joi.object().keys({
    key: Joi.string(),
    value: Joi.string(),
});
let pagingValidate = Joi.object().keys({
    page: Joi.number().min(1),
    limit: Joi.number(),
});
let schemaGetUsers = Joi.object().keys({
    filter: filterValidate,
    sorting: sortingValidate,
    paging: pagingValidate
});

/********************************************** Starts: Validation function  ***************************************************/

const validatesaveUser = (Input) => { 
    return Joi.validate(Input, schemasaveUser, { abortEarly: false });
}


const validateGetUsers = (Input) => { 
    return Joi.validate(Input, schemaGetUsers, { abortEarly: false });
}

module.exports = {
    validatesaveUser,
    validateGetUsers,
}
