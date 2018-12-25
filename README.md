Sobeys Microservice Application
====================================

## Introduction
This is a Sobeys microservice (API) . This is an backend API developed in Express and GraphQL.

## How to run
This application requires node to be installed on your system. Please check [upstream documentation](https://nodejs.org/en/download/)
for how to install node on your system.

### Development build
In application root path run following commands
```bash
cd app
npm install
npm start
```
## Environment variables
Environment variables is the main mechanism of manipulating application settings. Currently application recognizes
following environment variables:

| Variable            | Default value | Description                   |
| ---------------     | ------------- | ----------------------------- |
| NODE_ENV            | null          | Sets current environment. Allows application to manipulate some settings automatically          |
| HOST                | 0.0.0.0       | Address to listen on          |
| PORT                | 3000          | Port to listen on             |
| MYSQL_SERVICE_HOST  | localhost     | Database engine address       |
| MYSQL_SERVICE_PORT  | 3306          | Database engine port          |
| APP_DB_NAME         | null          | Database name                 |
| APP_DB_USER         | null          | Database user                 |
| APP_DB_PASS         | null          | Database password             |
|SOBEYS_SERVICE_SCHEME| null          | sobeys client api scheme      |
|SOBEYS_SERVICE_HOST  | null          | sobeys client api host        |
|SOBEYS_SERVICE_PORT  | null          | sobeys client api port        |
|SOBEYS_SERVICE_PATH  | null          | sobeys client api path        |


## Database configuration
All configuration related to database, can be seen in .env file and table sql file is in table folder

## How to run through POSTMAN (Rest Based on EXPRESS.JS)
======================================================
API Name : saveUser (for adding user to the DB)
URL : localhost:5000/saveUser
Method : POST
Params (JSON) : {"name":"Node","email":"node@messagebroadcast.com","gender":"male"}
Response : {"message": "SUCCESS"}
---------------------------------------------------------
API Name : getUsers (for fetching all user from the DB with filter functionality)
URL : localhost:5000/getUsers
Method : POST
Params (JSON) : {
	"filter":{"status":1}, 
	"paging":{"page":1, "limit":2},
	"sorting":{"key":"name","value":"DESC"}
}
Response : {
    "data": [
        {
            "id": 1,
            "name": "Sanjay Verma",
            "email": "sanjay.verma@messagebroadcast.com",
            "gender": "male",
            "status": 1
        },
        {
            "id": 4,
            "name": "Pintu",
            "email": "pintu@messagebroadcast.com",
            "gender": "male",
            "status": 1
        }
    ]
}


## How to run through GRAPHQL
======================================================
API Name : saveUser (for adding user to the DB)
Open URL : http://localhost:5000/graphiql
paste in the left : 
mutation{
  saveUser(input:{
    name:"Deepanshu"
    email:"deepanshu@messagebroadcast.com"
    gender:"male"
  })
  {
    message
    errors{
      message
      name
      data{
        fieldName
        message
      }
    }
  }
}

Then press on execute query and you will success message as a result indicate data has saved

---------------------------------------------------------
API Name : getUsers (for fetching all user from the DB with filter functionality)
Open URL : http://localhost:5000/graphiql
paste in the left : 
query{
  getUsers(input:{
    filter:{
      status:1
    }
    sorting:{
      key:"id"
      value:"ASC"
    },
    paging:{
      page:2
      limit:5
    }
  })
  {
    data{
      id
      name
      email
      gender
      status
    }
    errors{
      message
      name
      data{
        fieldName
        message
      }
    }
  }
}

Then press on execute query and you will see the result
