This repo contains the source code for a file management system. This app allows user to retrieve and read the file content.

## TECH STACK

- Express.js
- Prisma
- MySQL
- Google Cloud Storage

## FEATURES

- User Authentication using JWT tokens
- create file with content inside it
- retrieve a file based on id
- retrieve all files
- delete a file based on id
- read file based on id

## PREREQUISITES

Make sure you have following installed

- Node.js
- npm
- mySQL
- prisma
- express
- all the other dependencies in package.json

## INSTALLATION

- Clone the repo:
    
    ```jsx
    git clone git@github.com:Avi-17/Task-nest.git
    ```
    

- Install Dependencies
    
    ```jsx
    cd Task-nest
    npm i
    ```
    

- Setting up database
    
    inside a .env file, set the following variables
    
    ```jsx
    JWT_SECRET
    FIREBASE_ADMIN_SDK (base64 encoded Google Cloud Secrets)
    DATABASE_URL (to connect with db)
    DB_HOST
    DB_PORT
    DB_USER
    DB_PASSWORD
    DB_NAME
    ```
    
    After this, if you want you can also set up google cloud storage
    
    - generate private key, a json file will be downloaded, keep that file in your config folder

## ENTRY POINT

The entry point for this application is index.js.

## RUNNING THE APPLICATION

The server can be started with the help of following command

```jsx
node index.js
```

can also use nodemon

## DATABASE

For the file metadata, aws cloud storage is used. File creation, storage and deletion is done in google cloud storage. Both are in sync i.e. if a file is created or deleted, it is reflected both in mySQL as well as in cloud storage.

## API ENDPOINTS

- **METHOD: POST**
    - /auth/signup : requires email and password in request body. Signs up a new user
    - /auth/login : requires email and password in request body, generates a JWT token which is later used as a Authorization header to provide access to various operations to the file system
    - /api/files: creates a new file. requires fileName and content in request body.

- **METHOD: GET**
    - /api/files/:id : pass id in url, returns file details by id.
    - /api/allFiles : returns all Files metadata.
    - /api/files/:id/read: pass id in url, returns file content by id.

- **METHOD: DELETE**
    - /api/files/:id : pass id in url, deletes the file from id.

- **METHOD: PUT**
    - /api/files/:id : pass id in url and content in req body in json format. Updates (overwrites) the file Content.

## Middlewares

### authMiddleware

This middleware is used to secure access to various operations in the file system project by verifying JSON Web Tokens (JWT) for user authentication. Here's a breakdown of how it works:

1. **Token Extraction**: The middleware expects an authorization token in the `Authorization` header of the request, formatted as `Bearer <token>`. It retrieves and isolates the token.
2. **Access Denial**: If no token is provided, the middleware immediately returns a `401` status with an `Access Denied` message.
3. **Token Verification**: Using `jsonwebtoken` and the secret key (`JWT_SECRET`), it verifies the token’s validity. If valid, the `userId` from the token payload is assigned to `req.userId` for further use in downstream route handlers.
4. **Error Handling**: If the token is invalid or expired, the middleware responds with a `400` status and an `Invalid token` message.

Add this middleware to any route requiring authentication to ensure only authorized users can perform specific actions.

## CONTRIBUTIONS

Contributions are welcome! Feel free to submit pull requests or open issues if you find any problems or improvements.