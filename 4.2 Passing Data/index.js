import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    title: "Count Your Name ",
    year: new Date().getFullYear(),
  });
});

app.post("/submit", (req, res) => {
  let firstName = req.body["fName"];
  let lastName = req.body["lName"];
  let combineName = firstName + lastName;
  let namelength = combineName.length;

  // const data = {
  // countName: `<h2>There are ${namelength} letters in your name</h2>`,
  // };

  res.render("index.ejs", {
    countName: namelength,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
