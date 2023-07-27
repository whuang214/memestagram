const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");

// require these for file uploads!
const multer = require("multer");
const upload = multer();

// route:
// POST /api/users/

/*---------- Public Routes ----------*/
router.post("/signup", upload.single("photo"), usersCtrl.signup);
router.post("/login", usersCtrl.login);

router.get("/:username", usersCtrl.getProfile);

module.exports = router;
