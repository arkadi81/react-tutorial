var express = require("express");
var router = express.Router();

//since api uses db, lets import db here
var dbClient = require("../db/mongoDB");

// api calls go here
router.get("/", function(req, res, next) {
  res.send("api endpoint reached");
});

router.post("/", (req, res) => {
  console.log("Hellooooooooooooooooo!");
  res.send("api post endpoint reached"); //WORKS
});

router.post("/echo", (req, res) => {
  console.log("post /echo reached");
  console.log(req.body); // body parser will get the form data into a js object (NOT JSON FOR NOW)
  // res.send("hi");

  // res.send(JSON.stringify(req.body));

  // dont use backticks here - this server isnt setup to handle post ES6 stuff just yet.
});

router.post("/new", (req, res) => {
  console.log("post/new reached. attempting to save stuff");
  //add server side validation!
  dbClient.connect(err => {
    const collection = dbClient.db("sample_db").collection("devices");
    // perform actions on the collection object
    console.log("collection is ", collection);
    collection.save(req.body, (err, result) => {
      if (err) return console.log(err);

      console.log("saved to db");
    });
    dbClient.close();
    res.redirect("/");
  });
});

module.exports = router;
