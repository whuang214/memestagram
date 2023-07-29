const express = require("express");
const router = express.Router();
const postsCtrl = require("../../controllers/posts");

// require these for file uploads!
const multer = require("multer");
const upload = multer();

/*---------- Public Routes ----------*/
router.post("/", upload.single("photo"), postsCtrl.create);
router.delete("/:id", postsCtrl.deleteOne);
router.get("/", postsCtrl.index);
router.get("/:userId", postsCtrl.getUserPosts);

module.exports = router;
