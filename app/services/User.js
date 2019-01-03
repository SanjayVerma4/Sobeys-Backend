const model = require('./../models');
const validation = require('./../validation/userValidation');
const { formatError, validationError } = require('../lib/helpers');
// fetch did data from did tables by condition.
module.exports.saveUser = async(req, context) => {
    try{
        // validate input
        const validationErrors = validation.validatesaveUser(req).error;
        if(validationErrors){
            return validationError(formatError(validationErrors.details));
        }
        await model.User.build(req).save();
        return {message:'SUCCESS'};
    }catch(err){
        return validationError([{fieldName:'Server Internal Error',message:err.message}]);
    }
}

module.exports.getUsers = async(req, context) => {
    
    
    try{
        // const logCongif = require('../lib/log');
        // logCongif.writeErrorInLog({error:'Testin log system'});
        // validate input
        const validationErrors = validation.validateGetUsers(req).error;
        if(validationErrors){
            return validationError(formatError(validationErrors.details));
        }
        let where = {};
        let orderBy = ['id', 'ASC'];
        let limit = (req && req.paging && req.paging.limit) ? req.paging.limit : 10;
        let page = (req && req.paging && req.paging.page && req.paging.limit) ? (req.paging.page - 1) * limit : 0;
        
        // make condition object
        if(req && req.filter){
            where = req.filter;
        }
        // make sorting object
        if(req && req.sorting){
            orderBy = [req.sorting.key, req.sorting.value];
        }
        const userArr = await model.User.findAll({
            where:where,
            order:[orderBy],
            offset:page,
            limit:limit
        },        
    );
        return {data:userArr};
    }catch(err){
        return validationError([{fieldName:'Server Internal Error',message:err.message}]);
    }
}
