const Post = require("../models/post");

module.exports = {
  create,
  deleteLike,
};

// make a new like
async function create(req, res) {
  // param id is the post id
  console.log("creating like: ", req.params.id);
  // find the post by id
  try {
    const post = await Post.findById(req.params.id);
    // add the user id to the post likes array
    // check if the user id is already in the array
    if (post.likes.some((like) => like._id.toString() === req.user._id)) {
      console.log("user already liked this post pls fix frontend");
    } else {
      // console.log("user has not liked this post");
      post.likes.push(req.user._id);
      await post.save();
    }
    res.json(post);
  } catch (err) {
    console.log("error creating like: ", err);
    res.json(err);
  }
}

// delete a like
async function deleteLike(req, res) {
  // console.log("deleting like: ", req.params.id);
  try {
    const post = await Post.findById(req.params.id);
    // check if is not in the array
    console.log("post likes: ", post.likes);
    // go into each like object and check if the _id field matches the user id
    if (post.likes.every((like) => like._id.toString() !== req.user._id)) {
      console.log("user has not liked this post pls fix frontend");
    } else {
      // console.log("user has liked this post");
      // remove the user id from the post likes array
      post.likes.pull(req.user._id);
      await post.save();
    }
    res.status(200).json({ data: post });
  } catch (err) {
    console.log("error deleting like: ", err);
    res.status(400).json({ error: err });
  }
}
