var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(logger("dev"));

// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Routes
var articles = require('./routes/articles')
var notes = require('./routes/notes')
var scrape = require('./routes/scrape')

app.use('/articles', articles);
app.use('/notes', notes);
app.use('/scrape', scrape);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
