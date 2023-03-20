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
app.engine(
  "handlebars",
  exphbs.engine({ defaultLayout: "main", layoutsDir: "views" })
);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src"));

app.get("/", (req, res) => {
  res.render("index", { notesArray });
});

app.post("/", (req, res) => {
  notesArray = database;
  console.log("index");
  res.render("index", { notesArray });
});

app.get("/new", (req, res) => {
  notesArray = database;
  console.log("new");
  res.render("new", { notesArray });
});

app.post("/new", (req, res) => {
  console.log(database);
  notesArray = database;
  const noteTitle = req.body.noteTitle;
  const noteContent = req.body.noteContent;
  console.log(req.body.noteContent);
  noteTitles.push(noteTitle);
  noteContents.push(noteContent);
  notesArray.push([noteTitle, noteContent]);
  console.log(notesArray.toString());
  console.log("new");
  console.log(notesArray);
  fs.writeFile("./db.json", JSON.stringify(notesArray), (err) => {});
});

app.listen(3000, () =>
  console.log(`Example app is listening on port ${port}.`)
);
