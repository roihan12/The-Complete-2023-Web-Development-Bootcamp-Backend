import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json()

app.get("/", (req, res) => {
  // console.log(__dirname + "/public/index.html")
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", jsonParser, (req, res) => {
  res.send('welcome, ' + req.body)
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
