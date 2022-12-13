# Storefront Backend Project


___Table of Contents___

- [Storefront Backend Project](#storefront-backend-project)
- [Getting Started](#getting-started)
  - [Prerequisties](#prerequisties)
  - [Installing](#installing)
  - [Setup environment](#setup-environment)
- [Running the app](#running-the-app)
- [Running the unit tests](#running-the-unit-tests)
- [Built](#built)
- [Authors](#authors)
- [Required Technologies](#required-technologies)



A Storefront backend API written in NodeJS for Udacity. This app has APIs for users, Products, and Orders.

## Getting Started

Thes instructions will get you a copy of th project up and running on your local machine for development and testing



### Prerequisties
You need to following modules and dependencies installed to run this project:

you must change .env-example to .env 
then add env variables

```bash 
docker-compose..# to run postgres database on docker
node 18.........# To run the application
npm.............# For dependency management
```

### Installing

Simply, run the following command to install the project dependencies:

```bash
npm i
```

### Setup environment

First, create a `.env` file with all the required environment variables:

```bash
# .env
PORT=3000
NODE_ENV=dev

# DB
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_DB=store
POSTGRES_DB_TEST=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=changeme

# jwt & hash 
pepper=speak-and-enter
saltRounds=10
SECRET_KEY=crespo14899
```

Next, start the Postgres server on Docker:

```bash
docker-compose up
```

## Running the app

To the run the project 

```bash 
npm start
or 
npm run start
```

## Running the unit tests 

To run unit test 

```bash 
npm test 
or
npm run test:windows # For windows
```

## Built 

To built the application 

```bash 
npm run build
```

## Authors

- [@mocrespo](https://www.github.com/mocrespo)


## Required Technologies
To run the project must have this technologies:
- docker-compose to run the database
- Node for the application logic

## REQUIREMENTS

- [REQUIREMENTS](/REQUIREMENTS.md)