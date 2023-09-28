const express = require("express");
const { Client } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "password",
  database: "sentiens_database",
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
