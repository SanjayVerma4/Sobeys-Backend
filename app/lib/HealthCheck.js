const {database} = require('./../config');
const sequelize = require('./../models').sequelize;
const axios = require('axios');
axios.defaults.timeout = 5000;
//const { fileStorageApiServiceLink } = require('../config/index').microservicesLinks;

const liveness = (req, res) => {
    res.status(200).json({ Status: "Running" });
}
// const readiness = async (req, res) => {
//     const result = await checkMicroservicesLinks();
//     if (result.Status === 'Green') {
//          console.log(result);
//         res.status(200).json(result);
//     }
//     else {
//         res.status(500).json(result);
//     }
// }

// const checkMicroservicesLinks = async () => {
//     const result = {Status: 'Green', Services: {}};
//     result.Services = await Promise.all([checkMysqlConnection(), checkFileUpload()]);
//     for (let i = 0; i < result.Services.length; i++) {
//         const health = Object.values(result.Services[i]);
//         if (health[0].Status !== 'OK') {
//             result.Status = 'Red'
//         }
//     }
//     return result
// }

// const checkFileUpload = async () => {
// 	const result = {FileStorage: {Status: 'Failed'}};
//   try {
//     if (process.env.FILE_STORAGE_API_SERVICE_HOST && process.env.FILE_STORAGE_API_SERVICE_PORT) {
//         const response = await axios.get(`${fileStorageApiServiceLink}healthz/readiness`);
//         if(response.data.Status ==='Green'){
//         result.FileStorage.Status = 'OK';
//         return result;
//       }
//     }
//     result.FileStorage.Message = 'Invalid config for File Upload Storage host found';
//     return result;
//   }
//   catch (error) {
//     result.FileStorage.Message = 'Unable to connect with File Storage microservice';
//     if(!error.response){
//       return result;
//     }
//     else {
//       if(error.response.data.Status){
//         result.FileStorage.Message = 'There is an readiness issue in File Storage microservice';
//       }
//       return result
//     }
//   }
// }

// const checkMysqlConnection = async () => {
// 	const result = {Mysql: {Status: 'Failed'}};
//     try {
//         if (database.name && database.username && database.password && database.options.host) { 
//             const response = await sequelize.authenticate();
//             result.Mysql.Status = 'OK'
//             return result;
//         }
//         result.Mysql.Message = 'Invalid Mysql config found';
//         return result;
//     }
//     catch (err) {
//         result.Mysql.Message = 'Error while connecting to Mysql server';
//         return result;
//     }
// }

module.exports = {
    liveness,
    //readiness
}
