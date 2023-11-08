import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
const port = 3000;
let bandName = "";

const logger = (req, res, next) => {
  console.log(`Request Method: ${req.method} and Request URL ${req.url}`);
  next();
};

app.use(morgan("combined"), logger);

const __dirname = dirname(fileURLToPath(import.meta.url));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
var jsonParser = bodyParser.json();

app.get("/", (req, res) => {
  // console.log(__dirname + "/public/index.html")
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", jsonParser, (req, res) => {
  bandName = req.body["street"] + req.body["pet"];
  res.send(`<h1>Your band name is:</h1><h2>${bandName}✌️</h2>`);
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
