const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;
const database = require("./db.json");

let noteTitles = [];
let noteContents = [];
let notesArray = [];

// Set up Handlebars view engine
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src"));

app.get("/", (req, res) => {
  res.render("layouts/main", { notesArray });
});

app.post("/", (req, res) => {
  notesArray = database;
  console.log(database);
  res.render("layouts/main", { notesArray });
});

app.get("/new", (req, res) => {
  notesArray = database;
  console.log(notesArray);
  console.log(require("./views/layouts/new.handlebars"));
  res.render("layouts/new.handlebars", { notesArray });
});

app.post("/new", (req, res) => {
  notesArray = JSON.parse(database);
  const noteTitle = req.body.noteTitle;
  const noteContent = req.body.noteContent;
  console.log(req.body.noteContent);
  noteTitles.push(noteTitle);
  noteContents.push(noteContent);
  notesArray.push([noteTitle, noteContent]);
  console.log(notesArray.toString());
  fs.writeFile("./db.json", JSON.stringify(notesArray), (err) => {});
});

app.listen(3000, () =>
  console.log(`Example app is listening on port ${port}.`)
);
