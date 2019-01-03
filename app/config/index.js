module.exports = {
    server: {
        host: process.env.HOST || '0.0.0.0',
        port: process.env.PORT || 3000
    },
    database: {
        username: process.env.APP_DB_USER,
        name: process.env.APP_DB_NAME,
        password: process.env.APP_DB_PASS,
        options: {
            host: process.env.MYSQL_SERVICE_HOST || 'localhost',
            port: process.env.MYSQL_SERVICE_PORT || 3306,
            dialect: 'mysql',
            freezeTableName: true,
            define: {
                timestamps: false
            },
            pool: {
                max: 9,
                min: 0,
                idle: 10000
            }
        }
    },
    NODE_ENV:process.env.NODE_ENV,
    logsSetting: {
        name: "Sobeys-API",
        streams: [
            {
              level: 'error',
              path: '' // log ERROR and above to a file
            }
          ],
    },
    microservicesLinks: {
        //SobeysAPI: `${process.env.SOBEYS_SERVICE_SCHEME || 'http'}://${process.env.SOBEYS_SERVICE_HOST }:${process.env.SOBEYS_SERVICE_PORT }${process.env.SOBEYS_SERVICE_PATH || '/'}`,
        SobeysAPI: `${process.env.SOBEYS_SERVICE_SCHEME || 'http'}://${process.env.SOBEYS_SERVICE_HOST }${process.env.SOBEYS_SERVICE_PATH || '/'}`,
    }
};
