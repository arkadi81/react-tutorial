var createError = require("http-errors");
var bodyParser = require("body-parser"); // handles reading of form info, https://zellwk.com/blog/crud-express-mongodb/
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var apiRouter = require("./routes/api");

var credentials = require("./credentials");

// start mongo stuff here --------------------------------

const MongoClient = require("mongodb").MongoClient;
// DO NOT HARD CODE CREDENTIALS
const databaseConnectionString =
  "mongodb+srv://" +
  credentials.userName +
  ":" +
  credentials.password +
  "@cluster0-ovzge.mongodb.net/test?retryWrites=true&w=majority";
const PORT = 8080;

const dbClient = new MongoClient(databaseConnectionString, {
  useNewUrlParser: true
});

dbClient.connect(err => {
  // console.log(databaseConnectionString);
  // console.log(credentials.userName);
  if (err) return console.log(err);
  let db = dbClient.db(credentials.dbName); // whatever your database name is
  app.listen(PORT, () => {
    console.log("listening on port ", PORT);
  });
});

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
