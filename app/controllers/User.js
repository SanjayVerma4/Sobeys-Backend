const service = require('../services');

// fetch did data from did tables by condition
module.exports.getUsers = async(req, res) => {
    try {
        const response = await service.User.getUsers(req);
        res.send(response);
    } catch (err) {
        res.send(err.message);
    }
}

// fetch did data from did tables by condition
module.exports.saveUser = async(req, res) => {
    try {
        const response = await service.User.saveUser(req);
        res.send(response);
    } catch (err) {
        res.send(err.message);
    }
}
