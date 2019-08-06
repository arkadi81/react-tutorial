var express = require("express");
var router = express.Router();

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

module.exports = router;
