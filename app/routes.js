var HealthCheck = require('./lib/HealthCheck');
var controllers = require('./controllers');

const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'This is Test Microservice!' });
});
//check our api server is working or not
routes.get('/healthz/liveness', HealthCheck.liveness);

//check our api dependencies are working and up
//routes.get('/healthz/readiness', HealthCheck.readiness);

routes.post('/getUsers', (req, res) => {
    controllers.User.getUsers(req.body, res);
});
routes.post('/saveUser', (req, res) => {
    controllers.User.saveUser(req.body, res);
});

 module.exports = routes;
