var credentials = require("./credentials");

const MongoClient = require("mongodb").MongoClient;
const databaseConnectionString =
  "mongodb+srv://" +
  credentials.userName +
  ":" +
  credentials.password +
  "@cluster0-ovzge.mongodb.net/test?retryWrites=true&w=majority";

const dbClient = new MongoClient(databaseConnectionString, {
  useNewUrlParser: true
});

// dbClient.connect(err => {
//   // console.log(databaseConnectionString);
//   // console.log(credentials.userName);
//   if (err) return console.log(err);
//   console.log("mongo connection status", err);
//   db = dbClient.db(credentials.dbName); // whatever your database name is

//   console.log("mongo is connected");
// });

// console.log("db = ", db);

module.exports = dbClient;
