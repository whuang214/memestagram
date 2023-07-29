const Post = require("../models/post");

// s3 stuff here
const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();

const BUCKET_NAME = process.env.BUCKET_NAME;

module.exports = {
  create,
  index,
  getUserPosts,
  deleteOne,
};

function create(req, res) {
  console.log(req.body, req.file, " < req.body, req.file in posts/api create");
  // if no file is uploaded, req.file will be undefined
  if (!req.file) return res.status(400).json({ msg: "Please upload a file" });
  // where we will store the image in s3
  const filePath = `memestagram/users/${req.user._id}/images/posts/${req.file.originalname}`;

  // create the object that we will send to S3
  const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer };

  s3.upload(params, async function (err, data) {
    if (err) {
      console.log("===============================");
      console.log(
        err,
        " <- error from aws, Probably telling you your keys arent correct"
      );
      console.log("===============================");
      res.status(400).json({ error: "error from aws, check your terminal" });
    }

    try {
      // create a new post object
      const post = await Post.create({
        user: req.user,
        photoUrl: data.Location,
        caption: req.body.caption,
      });
      await post.populate("user");
      res.status(201).json({ data: post });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  });
}

// return all posts
async function index(req, res) {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: "desc" })
      .populate("user")
      .exec();
    res.status(200).json({ data: posts });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

// return all posts for a specific user
async function getUserPosts(req, res) {
  // console.log(req.params.userId, " < req.params.userId in getUserPosts");
  try {
    const posts = await Post.find({ user: req.params.userId })
      .sort({ createdAt: "desc" })
      .populate("user")
      .exec();
    res.status(200).json({ data: posts });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

// delete a post
async function deleteOne(req, res) {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (!post) {
      return res.status(404).json({ error: "post not found" });
    }

    if (!post.user.equals(req.user._id)) {
      return res.status(401).json({ error: "unauthorized" });
    }

    await post.remove();

    const url = new URL(post.photoUrl);
    const key = url.pathname.substring(1); // Removing the leading '/'

    // console.log(key, " < key in deleteOne");

    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
    };

    s3.deleteObject(params, function (err, data) {
      if (err) {
        console.error("Error deleting from S3: ", err);
        return res
          .status(400)
          .json({ error: "Failed to delete post from storage" });
      }

      return res.status(200).json({ data: "post removed" });
    });
  } catch (err) {
    console.error("Error deleting post: ", err);
    return res.status(400).json({ error: "Failed to delete post" });
  }
}
