const model = require('./../models');
const validation = require('./../validation/Perscription');
const { formatError, validationError } = require('../lib/helpers');
const {SobeysAPI} = require('./../config').microservicesLinks;
const axios = require('axios');
const logCongif = require('../lib/log');
const statusCode = require('../lib/constant');
const dummyResponse = { "store": { "address1": "address1", "address2": "address2", "city": "string", "corporateId": "string", "defaultStoreLanguage": "string", "email": "string", "fax1": "string", "fax2": "string", "labelPrefix": "string", "name": "string", "pharmacyHoursOfOperation": [ { "operatingDayTypeText": "string", "operatingDayType": "string", "operatingDate": "string", "operatingHoursTypeText": "string", "operatingHoursType": "string", "openingTime": "string", "closingTime": "string" } ], "phone1": "string", "phone2": "string", "postal": "string", "prov": "string", "storeDownUserContactInformation": "string", "storeDownUserMessage": "string", "storeDownUserMessageValidUntil": "2019-01-03T07:38:01.773Z", "storeHoursOfOperation": [ { "operatingDayTypeText": "string", "operatingDayType": "string", "operatingDate": "string", "operatingHoursTypeText": "string", "operatingHoursType": "string", "openingTime": "string", "closingTime": "string" } ], "storeId": "string", "storeNumber": "string", "website": "string", "windowsTimeZone": "string", "latitude": 0, "longitude": 0, "supportsRxChainAttributes": true, "supportsUpdatingStoreDownMessages": true, "supportsAddNewRxToCart": true }, "rx": { "rxNum": 0, "origRxNum": 0, "displayRxNum": "string", "securityToken": "string", "drg": { "brandName": "string", "genericName": "string", "din": "string", "dinTypeText": "string", "dinType": "string", "manufacturer": "string", "manufacturerAbbreviation": "string", "description": "string", "description2": "string", "equivTo": "string", "form": "string", "formAbbreviation": "string", "strength": "string", "schedule": "string", "refrigerated": true, "handlingInstructions": "string", "ahfsCode": "string", "ahfsDescription": "string", "images": [ { "lookupKey": "string" } ] }, "drgMix": { "description": "string", "form": "string", "formAbbreviation": "string", "schedule": "string", "refrigerated": true, "isIV": true }, "isMixture": true, "drugLine1": "string", "drugLine2": "string", "rxStatusText": "string", "rxStatus": "string", "feeForServiceTypeText": "string", "feeForServiceType": "string", "fillDate": "2019-01-03T07:38:01.773Z", "cancelDate": "2019-01-03T07:38:01.773Z", "firstFillDate": "2019-01-03T07:38:01.773Z", "rxExpiryDate": "2019-01-03T07:38:01.773Z", "stopDate": "2019-01-03T07:38:01.773Z", "dispQty": 0, "earliestRefillReadyDateType": "string", "earliestRefillReadyDateAbsoluteDate": "2019-01-03T07:38:01.773Z", "earliestRefillReadyDateRelativeMinutesFromNow": 0, "earliestRefillReadyDateValidUntil": "2019-01-03T07:38:01.773Z", "refillabilityText": "string", "refillability": "string", "notRefillableUntilDate": "2019-01-03T07:38:01.773Z", "doctorCallbackStatusText": "string", "doctorCallbackStatus": "string", "defaultDeliveryRouteTypeText": "string", "defaultDeliveryRouteType": "string", "availableDeliveryRouteTypes": [ { "routeTypeText": "string", "routeType": "string" } ], "isRefillable": true, "refillabilityMessage": "string", "refillabilityMessageQualifier": "string" }, "pat": { "lastNameAbbreviation": "string" } }; 


// fetch did data from did tables by condition.
module.exports.addRefill = async(req, context) => {    
    try{
        // validate input
        const validationErrors = validation.validateAddRefill(req).error;
        if(validationErrors){
            logCongif.writeErrorInLog({error:validationErrors.details}); // log console
            return validationError(formatError(validationErrors.details));
        }        
        //const apiRes = await axios.post(`${SobeysAPI}rx/getAnonymous`, JSON.stringify(requestParameter));
        return {status:statusCode.SUCCESS, message:'Refill prescription has been added', orderId:'24357', orderItemId:'w4fsdfdssd'};
    }catch(err){
        logCongif.writeErrorInLog({error:err.message}); // log console
        return validationError([{fieldName:'Server Internal Error',message:err.message}]);
    }
}

module.exports.lookupPerscription = async(req, context) => {       
    try{        
        // validate input
        const validationErrors = validation.validateLookupPerscriptionInput(req).error;
        if(validationErrors){
            logCongif.writeErrorInLog({error:validationErrors.details}); // log console
            return validationError(formatError(validationErrors.details));
        }
        req = req.params; // over ride the value
        let requestParameter = {};
        if('rxBarcode' in req){ // lookup by barcode           
            requestParameter.rxBarcode = req.rxBarcode;
        }
        else if(('storeId' in req) && ('rxNum' in req) && ('patLastName' in req) && ('patBirthDate' in req)){ // lookup by storeid, rxnumber, lastname and dob
            requestParameter = {storeId:req.storeId,rxNum:req.rxNum,patLastName:req.patLastName,patBirthDate:req.patBirthDate};
        }
        else if(('storeId' in req) && ('rxNum' in req) && ('rxSecurityToken' in req)){ // lookup by storeid, rxnumber, security token
            requestParameter = {storeId:req.storeId,rxNum:req.rxNum,rxSecurityToken:req.rxSecurityToken};           
        }
        //const apiRes = await axios.post(`${SobeysAPI}rx/getAnonymous`, JSON.stringify(requestParameter));
        return {data:dummyResponse};
    }catch(err){
        logCongif.writeErrorInLog({error:err.message}); // log console
        return validationError([{fieldName:'Server Internal Error',message:err.message}]);
    }
}
