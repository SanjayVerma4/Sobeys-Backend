const service = require('../services');

// fetch stores
module.exports.listStore = async(req, res) => {
    try {
        const response = await service.Store.listStore(req);
        res.send(response);
    } catch (err) {
        res.send(err.message);
    }
}
