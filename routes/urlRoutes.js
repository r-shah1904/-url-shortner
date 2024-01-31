const express = require("express");
const {generateShortURL} = require("../controllers/urlController");
const router = express.Router()

router.post("/", generateShortURL);

module.exports = router;