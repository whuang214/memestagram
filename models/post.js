const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema(
  {
    username: String,
    // one user has many likes
    // ref: 'User' is the name of the model
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // this is the user who created the post
    photoUrl: String, // this is the url of the photo
    caption: String, // this is the caption of the photo
    likes: [likesSchema], // this is an array of likes
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
