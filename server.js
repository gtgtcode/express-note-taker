const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src"));

app.post("/test", (req, res) => {
  res.send("You have been redirected to endpoint 2.");
});

app.listen(3000, () =>
  console.log(`Example app is listening on port ${port}.`)
);
