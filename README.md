# User Service API

Welcome to the User Service API. This API is designed to provide a simple way to manage users in a system. It provides the ability to create, read, update, and delete users. It also provides the ability to authenticate users and manage their roles.

## Table of Contents

-   [User Service API](#user-service-api)
    -   [Table of Contents](#table-of-contents)
    -   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Usage](#usage)
    -   [Unit Tests](#unit-tests)
    -   [Project Packages & Versions](#project-packages--versions)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

-   [Node.js](https://nodejs.org/en/download/)
-   [git](https://git-scm.com/downloads)
-   [MongoDB Local](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## Installation

1. Clone the repository

```bash
git clone https://github.com/Adnan-13/user-service-api.git
```

2. Install the dependencies

```bash
npm install
```

3. Go to the `config` directory and you will find a file called `config.json`. This file contains the configuration for the application. You can change the values to suit your environment. There you need to `mongoConnectionString` to your mongoDB connection string. You can also change the `port` to the port you want the application to run on. The default port is `3000` if you don't specify any. You can also change the `jwtSecret` to a secret of your choice and the `jwtExpireTime` to the time you want the token to expire in seconds. For example your `config.json` file should look something like this:

```json
{
    "port": 2525,
    "mongoConnectionString": "Your_mongoDB_connection_string",
    "jwtSecret": "Your_secret",
    "jwtExpireTime": 86400
}
```
Please note that the `mongoConnectionString` should be a valid connection string to your mongoDB database. Right now the application is configured to use my account on mongoDB Atlas which is temporary and will be removed soon. You can use your own mongoDB database by creating an account on [MongoDB Atlas](https://www.mongodb.com/atlas) and getting a connection string from there or you can use a local mongoDB database by installing it on your machine and getting a connection string from there.

4. After you have made the necessary changes to the `config.json` file, you can now start the application by running the following command:

```bash
npm run dev
```

## Usage

The API is now running on `http://localhost:2525`. You can use a tool like [Postman](https://www.postman.com/) to test the API. Also inside the `postman` directory you will find a file called `User_Service.postman_collection.json`. You can import this file into Postman and you will find all the routes and their descriptions in the collection. You can use this to test the API.

The API has authentication and authorization. You need to register a user and then login to get a token. You can then use the token to access the protected routes. There are three roles in the system: `BASIC_USER`, `ADMIN`, and `MODERATOR`.

## Routes

The following table shows the available routes and their descriptions with the required roles:

Prefix all routes with your base URL. For example, `http://localhost:2525`. All the endpoints accept and return JSON.

| Route | Method | Description | Authenticated | Role |
| --- | --- | --- | --- | --- |
| `/` | GET | Welcome message | No | N/A |
| `/health` | GET | Health check. Returns the time of request and also you can send any payload with the request and it will be returned in the response | No | N/A |
| `/auth/register` | POST | Register user | No | N/A |
| `/auth/login` | POST | Login user | No | N/A |
| `/auth/logout` | POST | Logout user | No | N/A |
| `/dashboard/user` | GET | Sends a welcome message to the user mentioning their name | Yes | ADMIN, MODERATOR, BASIC_USER | 
| `/dashboard/admin` | GET | Sends a welcome message to the admin mentioning their name | Yes | ADMIN |
| `/dashboard/moderator` | GET | Sends a welcome message to the moderator mentioning their name | Yes | ADMIN, MODERATOR |
| `/users` | GET | Gets all users | Yes | ADMIN, MODERATOR, BASIC_USER |
| `/users/:id` | GET | Gets a user by ID | Yes | ADMIN, MODERATOR, BASIC_USER |
| `/users/create` | POST | Creates a user | Yes | ADMIN |
| `/users/update` | POST | Updates a user. This endpoint is available to the user to update their own information and to the admins. | Yes | ADMIN, [User to be updated] |
| `/users/:id` | DELETE | Deletes a user by ID. This endpoint is also available to the user to delete their own account and to the admins. | Yes | ADMIN, [User to be deleted] |
| `/users/add-role` | POST | Adds a role to a user. This endpoint is available to the admins. | Yes | ADMIN |
| `/users/remove-role` | POST | Removes a role from a user. This endpoint is available to the admins. | Yes | ADMIN |

## Unit Tests

The application has unit tests written using [Jest](https://jestjs.io/). You can run the tests by running the following command:

```bash
npm test
```

This will run all the tests and show the results in the terminal. There are authentication tests which are currently based on my mongoDB Atlas database. So, for the current tests to pass, you need to have the same users in your database or use my database while it is still available. You can also change the tests to suit your environment and your users.


## Project Packages & Versions
The project uses Node.js version `20.11.0` and npm `10.2.4`. The following packages are used in the project:

| Package | Version | Dependency Type |
| --- | --- | --- |
| bcrypt | 5.1.1 | Dependency |
| body-parser | 1.20.2 | Dependency |
| cookie-parser | 1.4.6 | Dependency |
| express | 4.18.2 | Dependency |
| jsonwebtoken | 9.0.2 | Dependency |
| mongoose | 8.1.2 | Dependency |
| validator | 13.11.0 | Dependency |
| jest | 29.7.0 | Dev Dependency |
| nodemon | 3.0.3 | Dev Dependency |
| supertest | 6.3.4 | Dev Dependency |
