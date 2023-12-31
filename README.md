# Sentiens Core Server

This Express.js-TypeScript server acts as the main web server for the ongoing Sentiens project. Sentiens (Latin: feeling, perceiving) aims to provide a web-based journal application with built-in sentiment analysis so that users may gain greater insight into their mental state with the help of AI. Sentiment analysis will be done using a separate Flask microservice integrated with Hugging Face pipelines. The user interface is built using Next.js-TypeScript.

### Technologies Used

* TypeScript
* Node.js
* Express.js
* Prisma
* Vitest
* PostgreSQL

### Prerequisites

* Node.js
* PostgreSQL

### Getting Started

1. Clone the repo to your machine
2. Create a `.env` file to hold a variable `DATABASE_URL`, set to your local database connection string e.g. `"postgresql://postgres:password@localhost:5432/sentiens_database?schema=public"`
3. Install dependencies with `npm install`
4. Run the server with `npm run dev`
5. Try an example request like `GET all users` using the `http://localhost:3000/users` endpoint with a tool like Postman.
   1. You can filter active/inactive users like so: `http://localhost:3000/users?status=active`
