const { mergeResolvers } = require('merge-graphql-schemas');

const User = require('./user');
const Perscription = require('./perscription');
const Store = require('./Store');

const resolvers = [
    User,
    Perscription,
    Store,
]
module.exports = mergeResolvers(resolvers);
