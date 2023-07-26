const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();

const BUCKET_NAME = process.env.BUCKET_NAME;

module.exports = {
  signup,
  login,
};

async function signup(req, res) {
  console.log(req.body, req.file, " req.body", "req.file");

  // if no file is uploaded, req.file will be undefined
  if (!req.file) return res.status(400).json({ msg: "Please upload a file" });

  // make the filepath unique by adding a uuid to the filename
  // TODO add user id folder to file path to make it unique
  const filePath = `react-login/userImages/${uuidv4()}-${
    req.file.originalname
  }`;

  // create the object that we will send to S3
  const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer };

  // make the request to S3
  s3.upload(params, async function (err, data) {
    // first handle any errors
    if (err) {
      console.log("===============================");
      console.log(
        err,
        " <- error from aws, Probably telling you your keys arent correct"
      );
      console.log("===============================");
      res.status(400).json({ error: "error from aws, check your terminal" });
    }

    // if no errors, proceed...
    console.log("===============================");
    console.log(data, " <- data from aws");
    console.log("===============================");

    // create a new user object
    const user = new User(req.body);
    try {
      await user.save(); // save the user to the database
      const token = createJWT(user); // make a token for the user
      res.json({ token }); // send the token to the client
    } catch (err) {
      res.status(400).json(err); // send errors if there are any
    }
  });
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    console.log(req.body);

    if (!user) return res.status(401).json({ err: "bad credentials" });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: "24h" }
  );
}
