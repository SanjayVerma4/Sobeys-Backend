const model = require('./../models');
const { formatError, validationError } = require('../lib/helpers');
const {SobeysAPI} = require('./../config').microservicesLinks;
const axios = require('axios');
const logCongif = require('../lib/log');
const dummyResponse = { "storeList": [ { "address1": "string", "address2": "string", "city": "string", "corporateId": "string", "defaultStoreLanguage": "string", "email": "string", "fax1": "string", "fax2": "string", "labelPrefix": "string", "name": "string", "pharmacyHoursOfOperation": [ { "operatingDayTypeText": "string", "operatingDayType": "string", "operatingDate": "string", "operatingHoursTypeText": "string", "operatingHoursType": "string", "openingTime": "string", "closingTime": "string" } ], "phone1": "string", "phone2": "string", "postal": "string", "prov": "string", "storeDownUserContactInformation": "string", "storeDownUserMessage": "string", "storeDownUserMessageValidUntil": "2019-01-03T08:20:01.368Z", "storeHoursOfOperation": [ { "operatingDayTypeText": "string", "operatingDayType": "string", "operatingDate": "string", "operatingHoursTypeText": "string", "operatingHoursType": "string", "openingTime": "string", "closingTime": "string" } ], "storeId": "string", "storeNumber": "string", "website": "string", "windowsTimeZone": "string", "latitude": 0, "longitude": 0, "supportsRxChainAttributes": true, "supportsUpdatingStoreDownMessages": true, "supportsAddNewRxToCart": true } ] }; 


module.exports.listStore = async(req, context) => {       
    try{        
        //const apiRes = await axios.post(`${SobeysAPI}rx/getAnonymous`, JSON.stringify(requestParameter));
        return {data:dummyResponse};
    }catch(err){
        logCongif.writeErrorInLog({error:err.message}); // log console
        return validationError([{fieldName:'Server Internal Error',message:err.message}]);
    }
}
