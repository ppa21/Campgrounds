var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");

router.get("/new", function (req, res) {
  var id = req.params.id;

  Campground.findById(id, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

router.post("/", function (req, res) {
  var id = req.params.id;
  var comment = req.body.comment;
  Campground.findById(id, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      Comment.create(comment, function (err, comment) {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect(`/campgrounds/${id}`);
        }
      });
    }
  });
});

module.exports = router;
