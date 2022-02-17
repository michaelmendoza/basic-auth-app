# Basic Auth Server

A basic express nodejs server that supports user login/authorization using jsonwebtokens. Intended to be a seed application with minimal dependancies for furture projects. 

Features:

- Express app with API end points for login, users
- Mongodb/Mongoose for persistent data storage
- Code is organized into routes, controllers, and models
- Supports Routes using express router
- Supports Middleware for auth, and logger
- Supports Unit Testing using Jest 
- Supports login/authorization using jsonwebtokens
- Supports role based authorization
- Supports mock data generation
- Supports password hashing with bcrypt
- Supports environment variables for database connections and server ports

Dependancies:
- express : NodeJS web framework
- mongoose : Object Data Modeling (ODM) for MongoDB to make using MongoDB easier
- bcrypt : Library for Password Hashing
- jsonwebtoken : A library used for making tokens used for auth
- dotenv : Library for using .env files
- jest : Javascript testing framework
