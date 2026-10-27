# Blog API

A Restful Blog API built using Node.js, Express.js, MongoDb, Mongoose. It provides endpoints for user authentication, blog post management and comments with ownership based authorization to protect user's resources.

## Features
- User registration and login
- JWT-based authentication
- Create, read, update and delete blog posts
- Create, read, update and delete comments
- Input validation and error handling
- Ownership-based authorization for posts and comments
- MongoDB integration using Mongoose

## Tech Stack
- **Runtime**: Node.js
- **Backend Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **API Testing**: Postman

## Installation & Setup

### 1. Clone the repository

```bash 
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_PROJECT_DIRECTORY
```

### 2. Install dependencies

```bash
npm install 
```

### 3. Configure environment variables
Create a .env file in the project root:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Start the server
For a project configured for development with a start script:
```
npm run dev
```

### 5. Project Structure
```
project-root/
├── controllers/
├── models/
├── routes/
├── middleware/
├── .env.example
├── .gitignore
├── package.json
└── server.js
```