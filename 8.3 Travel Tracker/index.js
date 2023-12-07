import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "root123",
  port: 5432,
});

db.connect();

// let countries = [];
// db.query("SELECT country_code FROM visited_countries", (err, res) => {
//   if (err) {
//     console.error("Error executing query", err.stack);
//   } else {
//     countries = res.rows;
//   }
// });

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  //Write your code here.

  // let code = countryCode.map((code) => {
  //   return code['country_code'];
  // });

  // console.log(code);

  // let countriesCodes = [];
  // countries.forEach((country) => {
  //   countriesCodes.push(country.country_code);
  // });

  const countries = await checkVisisted();
  res.render("index.ejs", { countries: countries, total: countries.length });

  // res.render("index.ejs", { countries: countriesCodes, total: countriesCodes.length });
});

app.post("/add", async (req, res) => {
  let country_name = req.body.country;
  const result = await db.query(
    "SELECT country_code FROM countries WHERE country_name ILIKE $1",
    [`${country_name}%`]
  );
  if (result.rows.length == 0) {
    const countries = await checkVisisted();
    res.render("index.ejs", {
      error: `${country_name} does not exist, try again`,
      countries: countries,
      total: countries.length,
    });
  }

  console.log(result.rows);

  if (result.rows.length !== 0) {
    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    } catch (err) {
      const countries = await checkVisisted();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: `${country_name} has already been added, try again`,
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
