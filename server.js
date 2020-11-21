require("dotenv").config();
const http = require("http");
const express = require("express");

const PORT = process.env.PORT;
const app = express();

const routes = require("./routes/index");

app.listen(PORT);

routes(app); //register the routes