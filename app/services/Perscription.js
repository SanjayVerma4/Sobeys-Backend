const model = require('./../models');
const validation = require('./../validation/Perscription');
const { formatError, validationError } = require('../lib/helpers');
const {SobeysAPI} = require('./../config').microservicesLinks;
const axios = require('axios');
const logCongif = require('../lib/log');
const statusCode = require('../lib/constant');
const dummyResponse = { "store": { "address1": "977 Toy Avenue", "address2": "ST state", "city": "Oshawa", "corporateId": "string", "defaultStoreLanguage": "EN", "email": "heroine@att.net", "fax1": "519-895-2408", "fax2": "519-895-2410", "labelPrefix": "string", "name": "James E Stone", "pharmacyHoursOfOperation": [ { "operatingDayTypeText": "[Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday]", "operatingDayType": "Working/Non Working", "operatingDate": "[01/01/0000]", "operatingHoursTypeText": "Open", "operatingHoursType": "Open", "openingTime": "9:00 AM", "closingTime": "5:00 PM" } ], "phone1": "416.538.7788", "phone2": "416.538.3445", "postal": "515 St Clair Ave W", "prov": "CA", "storeDownUserContactInformation": "The Medicine Shoppe Pharmacy", "storeDownUserMessage": "Welcome", "storeDownUserMessageValidUntil": "2019-01-04T11:08:56.821Z", "storeHoursOfOperation": [ { "operatingDayTypeText": "[Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday]", "operatingDayType": "Working/Non Working", "operatingDate": "[01/01/0000]", "operatingHoursTypeText": "Open", "operatingHoursType": "Open", "openingTime": "9:00 AM", "closingTime": "5:00 PM" } ], "storeId": "ABC132", "storeNumber": "1324532", "website": "https://demo.pharmacylink.ca/docs/swagger", "windowsTimeZone": "2019-01-04T11:08:56.821Z", "latitude": 0, "longitude": 0, "supportsRxChainAttributes": true, "supportsUpdatingStoreDownMessages": true, "supportsAddNewRxToCart": true }, "rx": { "rxNum": 0, "origRxNum": 0, "displayRxNum": "Er9X/ErSky", "securityToken": "AOB12B", "drg": { "brandName": "The Medicine Shoppe", "genericName": "ROYAJD", "din": "TEST", "dinTypeText": "TEST", "dinType": "TEST", "manufacturer": "MEDICINE", "manufacturerAbbreviation": "MED", "description": "Salt composition of medicine", "description2": "Before taking this product, tell your doctor or pharmacist if you are allergic to any of its ingredients", "equivTo": "TEST", "form": "TEST", "formAbbreviation": "TE", "strength": "TEST", "schedule": "OD", "refrigerated": true, "handlingInstructions": "OD", "ahfsCode": "OD", "ahfsDescription": "OD", "images": [ { "lookupKey": "Product details" } ] }, "drgMix": { "description": "TEST", "form": "TEST", "formAbbreviation": "TE", "schedule": "OD", "refrigerated": true, "isIV": true }, "isMixture": true, "drugLine1": "TEST", "drugLine2": "TEST", "rxStatusText": "TEST", "rxStatus": "TE", "feeForServiceTypeText": "TEST", "feeForServiceType": "TEST", "fillDate": "2019-01-04T11:08:56.821Z", "cancelDate": "2019-01-04T11:08:56.821Z", "firstFillDate": "2019-01-04T11:08:56.821Z", "rxExpiryDate": "2019-01-04T11:08:56.821Z", "stopDate": "2019-01-04T11:08:56.821Z", "dispQty": 0, "earliestRefillReadyDateType": "TEST", "earliestRefillReadyDateAbsoluteDate": "2019-01-04T11:08:56.821Z", "earliestRefillReadyDateRelativeMinutesFromNow": 0, "earliestRefillReadyDateValidUntil": "2019-01-04T11:08:56.821Z", "refillabilityText": "TEST", "refillability": "TEST", "notRefillableUntilDate": "2019-01-04T11:08:56.821Z", "doctorCallbackStatusText": "TEST", "doctorCallbackStatus": "TEST", "defaultDeliveryRouteTypeText": "TEST", "defaultDeliveryRouteType": "TEST", "availableDeliveryRouteTypes": [ { "routeTypeText": "TEST", "routeType": "TEST" } ], "isRefillable": true, "refillabilityMessage": "TEST", "refillabilityMessageQualifier": "TEST" }, "pat": { "lastNameAbbreviation": "TEST" } } ; 


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
        return {status:statusCode.SUCCESS, orderId:'#BJ7987'};
        // return {status:statusCode.SUCCESS, message:'Refill prescription has been added', orderId:'24357', orderItemId:'w4fsdfdssd'};
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
        else{
            logCongif.writeErrorInLog({error:statusCode.INVALID_PARAM}); // log console
            return validationError([{fieldName:'Server Internal Error',message:statusCode.INVALID_PARAM}]);
        }
        const bakeResponse = {rx:{
            isRefillable:dummyResponse.rx.isRefillable, 
            refillabilityMessage:dummyResponse.rx.refillabilityMessage, refillabilityMessageQualifier:dummyResponse.rx.refillabilityMessageQualifier, earliestRefillReadyDateValidUntil:dummyResponse.rx.earliestRefillReadyDateValidUntil}};
        
        
        //const apiRes = await axios.post(`${SobeysAPI}rx/getAnonymous`, JSON.stringify(requestParameter));
        return {data:bakeResponse};
    }catch(err){
        logCongif.writeErrorInLog({error:err.message}); // log console
        return validationError([{fieldName:'Server Internal Error',message:err.message}]);
    }
}

// This API for get store, patient details by RXNum
module.exports.getDetailsByRXNumber = async(req, context) => { 
    try{        
        // validate input
        const validationErrors = validation.validateGetDetailsByRXNumber(req).error;
        if(validationErrors){
            logCongif.writeErrorInLog({error:validationErrors.details}); // log console
            return validationError(formatError(validationErrors.details));
        }
        return {data:{storeId:"ST2345",patientId:"PT9876",dob:"2017-03-1988",patFirstName:"Atif",patLastName:"Hasan"}};
    }catch(err){
        logCongif.writeErrorInLog({error:err.message}); // log console
        return validationError([{fieldName:'Server Internal Error',message:err.message}]);
    }
}