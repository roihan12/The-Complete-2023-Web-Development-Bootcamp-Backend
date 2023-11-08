//jshint esversion:6

import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home.ejs", {
    home: homeStartingContent,
    blogs: blogs,
  });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", {
    about: aboutContent,
  });
});

app.get("/article", (req, res) => {
  res.render("article.ejs");
});

const blogs = [
  {
    id: 1,
    title: "contoh",
    author: "roihan",
    content:
      "celerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit.",
    date: new Date(),
  },

  {
    id: 2,
    title: "contoh2",
    author: "roihan sori",
    content:
      "celerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit.",
    date: new Date(),
  },
];

app.post("/submit", (req, res) => {
  let title = req.body["title"];
  let author = req.body["author"];
  let content = req.body["content"];

  console.log(title, author, content);

  const blogData = {
    id: new Date().getSeconds(),
    title: title,
    author: author,
    content: content,
    date: new Date(),
  };

  blogs.push(blogData);
  res.redirect("/");
});

function getId(id) {
  // var obj = blogs.filter(function (val) {
  //   return val.id === id;
  // });
  const object = blogs.find((obj) => obj.id === id);
  // Filter returns an array, and we just want the matching item.
  return object;
}

app.post("/update/:id", (req, res) => {
  let id = parseInt(req.params["id"]);

  let title = req.body["title"];
  let author = req.body["author"];
  let content = req.body["content"];

  console.log(id, title, author, content);
  const upd_obj = blogs.map((obj) => {
    if (obj.id == id) {
      obj.title = title;
      obj.author = author;
      obj.content = content;
    }
    return obj;
  });

  console.log(upd_obj);
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  let id = parseInt(req.params["id"]);

  blogs.splice(
    blogs.findIndex((a) => a.id === id),
    1
  );

  console.log(blogs);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  let id = parseInt(req.params["id"]);

  // let blog = getId(id);
  const object = blogs.find((obj) => obj.id === id);
  console.log(object);

  res.render("edit.ejs", object);
});

app.get("/post/:id", (req, res) => {
  let id = parseInt(req.params["id"]);

  // let blog = getId(id);
  const object = blogs.find((obj) => obj.id === id);
  console.log(object);

  res.render("post.ejs", object);
});
app.get("/contact", (req, res) => {
  res.render("contact.ejs", {
    contact: contactContent,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
