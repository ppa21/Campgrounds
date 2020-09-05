var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");

router.get("/", (req, res) => {
  Campground.find({}, function (err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: campgrounds });
    }
  });
});

router.post("/", function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;

  Campground.create(
    {
      name: name,
      image: image,
      description: description,
    },
    function (err, campground) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/campgrounds");
      }
    }
  );
});

router.get("/new", function (req, res) {
  res.render("campgrounds/new");
});

router.get("/:id", function (req, res) {
  var id = req.params.id;

  Campground.findById(id)
    .populate("comments")
    .exec(function (err, campground) {
      if (err) {
        console.log(err);
      } else {
        console.log(campground);
        res.render("campgrounds/show", { campground: campground });
      }
    });
});

router.get("/:id/edit", function (req, res) {
  var id = req.params.id;

  Campground.findById(id, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/edit", { campground: campground });
    }
  });
});

router.post("/:id", function (req, res) {
  var id = req.params.id;
  var obj = req.body.campground;

  Campground.findByIdAndUpdate(id, obj, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.redirect(`/campgrounds/${id}`);
    }
  });
});

router.delete("/:id", function (req, res) {
  var id = req.params.id;

  Campground.findByIdAndRemove(id, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;
