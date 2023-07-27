const Post = require("../models/post");

// s3 stuff here
const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();

const BUCKET_NAME = process.env.BUCKET_NAME;

module.exports = {
  create,
  index,
};

function create(req, res) {
  console.log(req.body, req.file, " < req.body, req.file in posts/api create");
  //   // if no file is uploaded, req.file will be undefined
  //   if (!req.file) return res.status(400).json({ msg: "Please upload a file" });
  //   // where we will store the image in s3
  //   const filePath = `memestagram/users/${req.user._id}/images/posts/${req.file.originalname}`;

  //   // create the object that we will send to S3
  //   const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer };

  //   s3.upload = s3.upload(params, async function (err, data) {
  //     if (err) {
  //       console.log("===============================");
  //       console.log(
  //         err,
  //         " <- error from aws, Probably telling you your keys arent correct"
  //       );
  //       console.log("===============================");
  //       res.status(400).json({ error: "error from aws, check your terminal" });
  //     }

  //     try {
  //       // create a new post object
  //       const post = await Post.create({
  //         user: req.user,
  //         photoUrl: data.Location,
  //         caption: req.body.caption,
  //       });
  //       await post.populate("user");
  //       res.status(201).json({ data: post });
  //     } catch (err) {
  //       res.status(400).json({ error: err });
  //     }
  //   });
}

async function index(req, res) {}
