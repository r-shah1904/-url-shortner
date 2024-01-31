const express = require("express");
const { model } = require("mongoose");
const router = express.Router();

router.get("/", (req, res)=>{
    return res.render("home")
})
router.get("/signup", (req, res)=>{
    return res.render("signup")
})
router.get("/loginPage", (req,res)=>{
    return res.render("login")
})
router.get("/loginError", (req,res)=>{
    return res.render("loginError")
})

module.exports = router; 