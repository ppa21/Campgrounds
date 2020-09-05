var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methorOverride = require("method-override");
var mongoose = require("mongoose");
var seedDB = require("./seeds");

var campgroundRoutes = require("./routes/campgrounds");
var commentsRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");

mongoose.connect("add your mongodb url here");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methorOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
seedDB();

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);

app.listen(3000, function () {
  console.log("server started");
});

// reference: https://github.com/nax3t/webdevbootcamp
// reference: https://github.com/iamkiko/webdevbootcamp
// database:  https://ide.goorm.io/my
