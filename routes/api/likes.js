const express = require("express");
const router = express.Router();

// route = /api/likes

const likesCtrl = require("../../controllers/likes");

router.post("/:id", likesCtrl.create);
router.delete("/:id", likesCtrl.deleteLike);

module.exports = router;
