import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const today = new Date();
let day = today.getDay();

app.get("/", (req, res) => {
  const weekday = "Hey! It's a weekday, it's time to work hard!";
  const weekend = "Hey! It's a the weekend, it's time to have fun!";

  if (day === 0 || day === 6) {
    res.render(__dirname + "/views/index.ejs", {
      week: weekend,
    });
  } else {
    res.render(__dirname + "/views/index.ejs", {
      week: weekday,
    });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
