# Nestjs API

## Description

Simple Mock Server for Testing the Compliancy Platform Client App, based on [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ yarn
```

## Database
```
$ docker-compose up
$ yarn migration:run
```

## Environment

```
$ cp .env.example .env
```

Make any necessary changes to the `.env` file.

## Authorization

By default, authorization is enabled. However, this can be disabled by changing the following line in the `.env` file:

```
API_AUTH=false
```

## Running the app

In development mode you can simply run the app in watch mode like this:

```
$ yarn start:dev
```

The app is now available via the following link:

```
http://localhost:3000/api/v1
```

In production:

```
$ yarn start:prod
```

## Swagger

You can access the swagger docs via the following link:

```
http://localhost:3000/api/v1/docs/
```

Note that for the authorization you will have to enter the following value:

```
Bearer <TOKEN>
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations

Create a new empty migration:
```
$ ts-node ./node_modules/typeorm/cli.js migration:create -n NameOfMigration

```

Generate a migration from current schemas:
```
$ ts-node ./node_modules/typeorm/cli.js migration:generate -n NameOfMigration

```

Run all the migrations:
```
$ yarn migration:run

```

## References

* [NestJS](https://nestjs.com)
* [Developing Backend APIs with Nest.js](https://auth0.com/blog/full-stack-typescript-apps-part-1-developing-backend-apis-with-nestjs)
* [JWT](https://github.com/nestjs/jwt)
* [Typeorm](https://github.com/typeorm/typeorm)
* [Migrations](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md)
* [PassportJS](http://www.passportjs.org)
* [Faker](https://github.com/marak/Faker.js)
* [AutomapperTS](https://github.com/loedeman/AutoMapper/wiki/Getting-started)
* [Config](lorenwest/node-config)
