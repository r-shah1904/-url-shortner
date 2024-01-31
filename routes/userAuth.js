const express = require("express");
const router = express.Router();
const {handleSginUp, handleLogin} = require("../controllers/authController")
router.post("/", handleSginUp);
router.post("/login", handleLogin);
module.exports=router;