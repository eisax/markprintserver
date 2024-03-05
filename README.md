

1. `POST /api/auth/signup`: Creates a new user
2. `POST /api/auth/signin`: Logs in a user


## Tools
* NodeJS/Express: Server
* MySQL: Storage
* JWT: Token based authentication
* bcryptjs: Password security
* winston/morgan: Logs
* Joi: Validations

## Available scripts
* `start`: Starts the server with node
* `start:dev`: Starts the server in watch mode
* `db:up`: Creates the database
* `db:down`: Drops the database
* `tables:up`: Creates database tables
* `db:init`: Creates both the database and tables

## Getting started
Install the required dependencies with

```sh
npm install
```

Initialize the database with

```sh
npm run db:init
```

Start the app with

```sh
npm start
```

You can also start it in watch mode with

```sh
npm run start:dev
```

## Folder structure
```sh
.
├── README.md
├── package-lock.json
├── package.json
└── src
    ├── app.js
    ├── config
    │   ├── db.config.init.js
    │   └── db.config.js
    ├── controllers
    │   └── auth.controller.js
    ├── database
    │   ├── queries.js
    │   └── scripts
    │       ├── dbDown.js
    │       ├── dbUp.js
    │       └── tablesUp.js
    ├── index.js
    ├── middlewares
    │   ├── asyncHandler.js
    │   ├── checkEmail.js
    │   └── validatorHandler.js
    ├── models
    │   └── user.model.js
    ├── routes
    │   └── auth.route.js
    ├── utils
    │   ├── logger.js
    │   ├── password.js
    │   ├── secrets.js
    │   └── token.js
    └── validators
        └── auth.js
```