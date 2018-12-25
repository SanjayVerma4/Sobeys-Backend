if (process.env.NODE_ENV === 'local') {
    require('dotenv').config();
}
const app = require('express')();
const helmet = require('helmet');
const cors = require('cors');
app.use(helmet());
app.use(cors());

const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const Playground = require('graphql-playground-middleware-express').default;
const bodyParser = require('body-parser');
const routes = require('./routes');
const schema = require('./schema');
const { server } = require('./config');
console.log(server);
app.use(bodyParser.json());
app.use('/graphiql', Playground({ endpoint: '/graphql' }));
app.use('/', routes);
const buildOptions = async(req, res) => {
    const user = {id:1};
    return {
        context: { user },
        schema,
    }
}
app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));
// Turn on that server!
app.listen(server.port, server.host, () => {
    console.log('App listening on port ', server.port);
    console.log(`Now browse to ${server.host}:${server.port}`);
});
