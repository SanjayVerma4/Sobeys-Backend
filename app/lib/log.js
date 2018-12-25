const { logsSetting } = require('../config');
const bunyan = require('bunyan');
const dateFormat = require('dateformat');

module.exports.writeErrorInLog = (customError) => {
    const currentDate = dateFormat(new Date(), 'yyyy-mm-dd');
    let logConfig = {...logsSetting};
    const path = logConfig.streams[0].path = `${__dirname}/../logs/${currentDate}.log`;
    logConfig.streams[0].path = path;
    const log = bunyan.createLogger(logConfig);
    log.error(customError);
}
