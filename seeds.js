var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
  {
    name: "Cloud's rest",
    image:
      "https://images.pexels.com/photos/587976/pexels-photo-587976.jpeg?auto=compress&cs=tinysrgb&h=350",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Forest Galore",
    image:
      "https://images.pexels.com/photos/1082316/pexels-photo-1082316.jpeg?auto=compress&cs=tinysrgb&h=350",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Twinkle Twinkle",
    image:
      "https://pixabay.com/get/52e7d0454d55a814f1dc84609620367d1c3ed9e04e5074407c2e73d0954ec0_340.jpg",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

function seedDB() {
  Campground.remove({}, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("Removed all the campgrounds");
    data.forEach((seed) => {
      Campground.create(seed, function (err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log("added a campgroud");
          Comment.create(
            {
              text: "This place is great, but I wish there was internet.",
              author: "Homer",
            },
            function (err, comment) {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("added a comment");
              }
            }
          );
        }
      });
    });
  });

  // Comment.remove({}, (err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("removed all comments");
  //   }
  // });
}

module.exports = seedDB;
