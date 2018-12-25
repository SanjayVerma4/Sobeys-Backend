const path = require('path');
const {mergeTypes, fileLoader} = require('merge-graphql-schemas');

const types = fileLoader(path.join(__dirname, '.'), { recursive: true })

module.exports = mergeTypes(types);
