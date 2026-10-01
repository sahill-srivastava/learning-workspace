# Keycraft — Password Generator

A name-inspired password generator built with React, Express, Node.js, and MongoDB. Password generation uses the browser's cryptographically secure random number generator. Names and generated passwords are never sent to the API; MongoDB stores only non-sensitive generator preferences.

## Requirements

- Node.js 20.19+ or 22.12+
- MongoDB running locally or a MongoDB connection string

## Run locally

1. In `server`, copy `.env.example` to `.env` and set `MONGODB_URI` if needed.
2. In `password-generator/server`, run `npm install`, then `npm run dev`.
3. In `password-generator/client`, run `npm install`, then `npm run dev`.
4. Open the Vite URL shown in the client terminal.

The Vite development server proxies `/api` requests to `http://localhost:5000`.
